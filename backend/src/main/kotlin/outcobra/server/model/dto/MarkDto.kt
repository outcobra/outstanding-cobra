package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.Mark
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class MarkDto : MappableDto<MarkDto, Mark> {
    override fun getMapper(): Mapper<MarkDto, Mark> {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun toEntity(): Mark {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
//TODO Implement
}