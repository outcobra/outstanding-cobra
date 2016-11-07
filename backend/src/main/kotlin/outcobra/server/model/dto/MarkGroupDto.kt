package outcobra.server.model.dto

import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.MarkGroup
import outcobra.server.model.mapper.Mapper

class MarkGroupDto : MappableDto<MarkGroupDto, MarkGroup> {
    override fun toEntity(): MarkGroup {
        throw UnsupportedOperationException("not implemented")
    }

    override fun getMapper(): Mapper<MarkGroupDto, MarkGroup> {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}