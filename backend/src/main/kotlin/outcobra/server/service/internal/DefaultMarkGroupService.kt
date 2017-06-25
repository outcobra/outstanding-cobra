package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.MarkGroup
import outcobra.server.model.Semester
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.mark.SemesterMarkDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.mapper.mark.SemesterMarkDtoMapper
import outcobra.server.model.repository.MarkGroupRepository
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
                    val semesterMarkDtoMapper: SemesterMarkDtoMapper,
                    val semesterRepository: SemesterRepository,
                    val subjectRepository: SubjectRepository)
    : DefaultBaseService<MarkGroup, MarkGroupDto, MarkGroupRepository>(markGroupMapper, markGroupRepository, validator, MarkGroup::class), MarkGroupService {

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