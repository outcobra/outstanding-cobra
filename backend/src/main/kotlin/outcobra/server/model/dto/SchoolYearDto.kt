package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.SchoolYear
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class SchoolYearDto : MappableDto<SchoolYearDto, SchoolYear> {
    override fun getMapper(): Mapper<SchoolYearDto, SchoolYear> {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun toEntity(): SchoolYear {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
//TODO Implement
}