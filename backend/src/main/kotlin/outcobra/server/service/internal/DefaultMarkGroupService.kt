package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.MarkGroup
import outcobra.server.model.QMarkValue
import outcobra.server.model.Semester
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.mark.SemesterMarkDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.mapper.MarkMapper
import outcobra.server.model.mapper.mark.SemesterMarkDtoMapper
import outcobra.server.model.repository.MarkGroupRepository
import outcobra.server.model.repository.MarkValueRepository
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.model.repository.SubjectRepository
import outcobra.server.service.MarkGroupService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject
import javax.security.auth.Subject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Service
class DefaultMarkGroupService
@Inject constructor(markGroupMapper: Mapper<MarkGroup, MarkGroupDto>,
                    markGroupRepository: MarkGroupRepository,
                    validator: RequestValidator<MarkGroupDto>,
                    val markValueRepository: MarkValueRepository,
                    val semesterMarkDtoMapper: SemesterMarkDtoMapper,
                    val semesterRepository: SemesterRepository,
                    val subjectRepository: SubjectRepository,
                    val markMapper: MarkMapper)
    : DefaultBaseService<MarkGroup, MarkGroupDto, MarkGroupRepository>(markGroupMapper, markGroupRepository, validator, MarkGroup::class), MarkGroupService {

    override fun save(dto: MarkGroupDto): MarkGroupDto {
        requestValidator.validateRequestByDto(dto)

        if (dto.parentGroupId != 0L) {
            val currentMarks = markValueRepository.findAll(QMarkValue.markValue.markGroup.id.eq(dto.id)).toMutableList()
            dto.markValues.forEach { markValue ->
                val result = currentMarks.removeIf { it.id == markValue.id }
                if (!result) {
                    markValue.markGroupId = dto.id
                    markValueRepository.save(markMapper.fromDto(markValue))
                }
            }
            if (currentMarks.isNotEmpty()) {
                val subjectMarkGroup = repository.findOne(dto.parentGroupId)
                currentMarks.forEach {
                    it.markGroup = subjectMarkGroup
                    markValueRepository.save(it)
                }
            }
        }
        return mapper.toDto(repository.save(mapper.fromDto(dto)))
    }

    override fun delete(id: Long) {
        requestValidator.validateRequestById(id, MarkGroup::class)
        val markGroup = repository.findOne(id)
        markGroup.marks.map { it.id }.forEach(markValueRepository::delete)
        super.delete(id)
    }

    override fun getGroupBySubject(subjectId: Long): MarkGroupDto {
        requestValidator.validateRequestById(subjectId, Subject::class)
        val markGroup = subjectRepository.findOne(subjectId).markGroup
        return mapper.toDto(markGroup)
    }

    override fun getInitialData(semesterId: Long): SemesterMarkDto {
        requestValidator.validateRequestById(semesterId, Semester::class)
        return semesterMarkDtoMapper.toDto(semesterRepository.findOne(semesterId))
    }
}