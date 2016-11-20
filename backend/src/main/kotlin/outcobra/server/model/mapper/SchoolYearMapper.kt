package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.SchoolYear
import outcobra.server.model.dto.SchoolYearDto

@Component
class SchoolYearMapper : Mapper<SchoolYear, SchoolYearDto> {
    override fun fromDto(from: SchoolYearDto): SchoolYear {
        throw UnsupportedOperationException()
    }

    override fun toDto(from: SchoolYear): SchoolYearDto {
        throw UnsupportedOperationException()
    }
}