package outcobra.server.model.mapper.mark

import org.springframework.stereotype.Component
import outcobra.server.exception.ValidationKey
import outcobra.server.model.domain.Color
import outcobra.server.model.domain.MarkGroup
import outcobra.server.model.domain.Semester
import outcobra.server.model.domain.Subject
import outcobra.server.model.dto.ColorDto
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.mark.SemesterMarkDto
import outcobra.server.model.dto.mark.SubjectMarkDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.mapper.BaseMapper
import outcobra.server.model.mapper.InstitutionMapper
import outcobra.server.model.mapper.SchoolClassMapper
import javax.inject.Inject


/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Component
class SemesterMarkDtoMapper @Inject constructor(val markGroupMapper: Mapper<MarkGroup, MarkGroupDto>,
                                                val colorMapper: Mapper<Color, ColorDto>,
                                                val schoolClassMapper: SchoolClassMapper,
                                                val institutionMapper: InstitutionMapper)
    : Mapper<Semester, SemesterMarkDto>, BaseMapper() {

    override fun fromDto(from: SemesterMarkDto): Semester {
        throw UnsupportedOperationException("It is not supported to parse this dto to a semester")
    }

    override fun toDto(from: Semester): SemesterMarkDto {
        // TODO amend-base-data use correct semester
        val schoolClass = from.schoolYear?.schoolClasses?.first() ?: ValidationKey.ENTITY_NOT_FOUND.throwException()
        val semesterMarkGroup = MarkGroup(marks = from.subjects.map { it.markGroup!! }.toMutableList())
        val institution = schoolClass.institution ?: ValidationKey.ENTITY_NOT_FOUND.throwException()
        return SemesterMarkDto(from.id, from.name, from.validFrom, from.validTo,
                institutionMapper.toDto(institution), schoolClassMapper.toDto(schoolClass),
                semesterMarkGroup.getValue(),
                from.subjects.map { subjectToMarksDto(it) })
    }

    private fun subjectToMarksDto(from: Subject): SubjectMarkDto {
        val color = from.color!!
        val markGroup = from.markGroup!!
        return SubjectMarkDto(from.id, from.name, colorMapper.toDto(color), markGroupMapper.toDto(markGroup))
    }

}