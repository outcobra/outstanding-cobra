package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.SchoolClass
import outcobra.server.model.dto.SchoolClassDto

/**
 * Created by Florian on 12.11.2016.
 */
@Component
class SchoolClassDtoMapper : Mapper<SchoolClass, SchoolClassDto> {
    //TODO implement
    override fun toDto(from: SchoolClass): SchoolClassDto {
        return SchoolClassDto()
    }

    override fun fromDto(from: SchoolClassDto): SchoolClass {
        return SchoolClass()
    }
}