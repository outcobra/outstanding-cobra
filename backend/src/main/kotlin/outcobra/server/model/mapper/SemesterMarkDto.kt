package outcobra.server.model.mapper

import outcobra.server.model.MarkValue
import outcobra.server.model.Semester
import outcobra.server.model.dto.MarkDto
import outcobra.server.model.dto.mark.SemesterMarkDto
import outcobra.server.model.interfaces.Mapper

/**
 * Created by fbbue on 20.05.2017.
 */
class SemesterMarkDto(val markDtoMapper: Mapper<MarkValue, MarkDto>) : Mapper<Semester, SemesterMarkDto>, BaseMapper() {
    override fun fromDto(from: SemesterMarkDto?): Semester {
        TODO("not implemented")
    }

    override fun toDto(from: Semester?): SemesterMarkDto {
        TODO("not implemented")
    }

}