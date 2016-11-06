package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.MarkGroup
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class MarkGroupDto : MappableDto<MarkGroupDto, MarkGroup> {
    override fun toEntity(): MarkGroup {
        throw UnsupportedOperationException("not implemented")
    }

    override fun getMapper(): Mapper<MarkGroupDto, MarkGroup> {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}