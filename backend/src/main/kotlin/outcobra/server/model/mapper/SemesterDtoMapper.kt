package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto

/**
 * Created by Florian on 13.11.2016.
 */
@Component
open class SemesterDtoMapper : Mapper<Semester, SemesterDto> {
    //TODO Implement
    override fun toDto(from: Semester): SemesterDto {
        return SemesterDto()
    }

    override fun fromDto(from: SemesterDto): Semester {
        return Semester()
    }
}