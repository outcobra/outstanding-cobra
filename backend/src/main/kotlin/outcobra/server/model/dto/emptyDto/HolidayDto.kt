package outcobra.server.model.dto.emptyDto

import outcobra.server.model.Holiday
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.mapper.Mapper

class HolidayDto : MappableDto<HolidayDto, Holiday> {
    override fun getMapper(): Mapper<HolidayDto, Holiday> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Holiday {
        throw UnsupportedOperationException("not implemented")
    }
}