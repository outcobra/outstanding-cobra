package outcobra.server.model.dto

import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.Holiday
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class HolidayDto : MappableDto<HolidayDto,Holiday> {
    override fun getMapper(): Mapper<HolidayDto, Holiday> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Holiday {
        throw UnsupportedOperationException("not implemented")
    }
}