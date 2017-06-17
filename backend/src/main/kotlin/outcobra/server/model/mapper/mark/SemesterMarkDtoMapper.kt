package outcobra.server.model.mapper.mark

import org.springframework.stereotype.Component
import outcobra.server.model.Color
import outcobra.server.model.MarkGroup
import outcobra.server.model.Semester
import outcobra.server.model.Subject
import outcobra.server.model.dto.ColorDto
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.mark.SemesterMarkDto
import outcobra.server.model.dto.mark.SubjectMarkDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.mapper.BaseMapper
import javax.inject.Inject


/**
 * @author Florian Bürgi
 * @since <since>
 */
@Component
class SemesterMarkDtoMapper @Inject constructor(val markGroupMapper: Mapper<MarkGroup, MarkGroupDto>,
                                                val colorMapper: Mapper<Color, ColorDto>)
    : Mapper<Semester, SemesterMarkDto>, BaseMapper() {

    override fun fromDto(from: SemesterMarkDto?): Semester {
        throw UnsupportedOperationException("It is not supported to parse this dto to a semester")
    }

    override fun toDto(from: Semester): SemesterMarkDto {
        return SemesterMarkDto(from.id, from.name, from.validFrom, from.validTo, from.subjects.map { subjectToMarksDto(it) })
    }

    private fun subjectToMarksDto(from: Subject): SubjectMarkDto {
        return SubjectMarkDto(from.id, from.name, colorMapper.toDto(from.color), markGroupMapper.toDto(from.markGroup))
    }

}