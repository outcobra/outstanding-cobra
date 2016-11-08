package outcobra.server.model.dto.emptyDto

import outcobra.server.model.SchoolClass
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.mapper.Mapper

class SchoolClassDto : MappableDto<SchoolClassDto, SchoolClass> {
    override fun getMapper(): Mapper<SchoolClassDto, SchoolClass> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): SchoolClass {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}