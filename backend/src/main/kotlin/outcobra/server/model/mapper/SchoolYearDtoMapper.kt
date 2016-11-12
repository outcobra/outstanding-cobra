package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.SchoolYear
import outcobra.server.model.dto.SchoolYearDto

/**
 * Created by Florian on 12.11.2016.
 */
@Component
class SchoolYearDtoMapper : Mapper<SchoolYear,SchoolYearDto> {
    //TODO Implement
    override fun fromDto(from: SchoolYearDto): SchoolYear {
        return SchoolYear()
    }

    override fun toDto(from: SchoolYear): SchoolYearDto {
        return SchoolYearDto()
    }
}