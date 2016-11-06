package outcobra.server.model.dto

import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.SchoolClass
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class SchoolClassDto : MappableDto<SchoolClassDto, SchoolClass> {
    override fun getMapper(): Mapper<SchoolClassDto, SchoolClass> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): SchoolClass {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}