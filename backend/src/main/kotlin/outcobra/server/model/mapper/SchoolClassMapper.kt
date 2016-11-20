package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.SchoolClass
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.interfaces.Mapper

/**
 * @since <since>
 */
@Component
class SchoolClassMapper : Mapper<SchoolClass, SchoolClassDto> {
    override fun toDto(from: SchoolClass): SchoolClassDto {
        throw UnsupportedOperationException()
    }

    override fun fromDto(from: SchoolClassDto): SchoolClass {
        throw UnsupportedOperationException()
    }
}