package outcobra.server.model.dto.emptyDto

import outcobra.server.model.Mark
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.mapper.Mapper

class MarkDto : MappableDto<MarkDto, Mark> {
    override fun getMapper(): Mapper<MarkDto, Mark> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Mark {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}