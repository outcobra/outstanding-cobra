package outcobra.server.model.mapper.mark

import org.springframework.stereotype.Component
import outcobra.server.exception.ValidationKey
import outcobra.server.model.domain.*
import outcobra.server.model.dto.ColorDto
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.mark.SemesterMarkDto
import outcobra.server.model.dto.mark.SubjectMarkDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.mapper.BaseMapper
import outcobra.server.model.mapper.InstitutionMapper
import outcobra.server.model.mapper.SchoolClassMapper
import outcobra.server.model.repository.MarkGroupRepository
import javax.inject.Inject


/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Component
class SemesterMarkDtoMapper @Inject constructor(val markGroupMapper: Mapper<MarkGroup, MarkGroupDto>,
                                                val markGroupRepository: MarkGroupRepository,
                                                val colorMapper: Mapper<Color, ColorDto>,
                                                val schoolClassMapper: SchoolClassMapper,
                                                val institutionMapper: InstitutionMapper)
    : Mapper<Semester, SemesterMarkDto>, BaseMapper() {

    override fun fromDto(from: SemesterMarkDto): Semester {
        throw UnsupportedOperationException("It is not supported to parse this dto to a semester")
    }

    override fun toDto(from: Semester): SemesterMarkDto {
        val schoolClass = from.schoolYear?.schoolClasses?.first() ?: ValidationKey.ENTITY_NOT_FOUND.throwException()

        val markGroupsOfSemester = markGroupRepository.findAll(QMarkGroup.markGroup1.schoolClassSemesterSubject.schoolClassSemester.semester.id.eq(from.id))

        val semesterMarkGroup = MarkGroup(marks = markGroupsOfSemester.toMutableList())

        return SemesterMarkDto(from.id, from.name, from.validFrom, from.validTo, schoolClassMapper.toDto(schoolClass),
                semesterMarkGroup.getValue(),
                markGroupsOfSemester
                        .filter { it.schoolClassSemesterSubject.subject != null }
                        .map { subjectToMarksDto(it.schoolClassSemesterSubject.subject!!, it) })
    }

    private fun subjectToMarksDto(from: Subject, markGroup: MarkGroup): SubjectMarkDto {
        val color = from.color
        return SubjectMarkDto(from.id, from.name, colorMapper.toDto(color), markGroupMapper.toDto(markGroup))
    }

}