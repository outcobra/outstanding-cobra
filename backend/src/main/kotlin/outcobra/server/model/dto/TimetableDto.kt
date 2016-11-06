package outcobra.server.model.dto

import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.Timetable
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class TimetableDto : MappableDto<TimetableDto, Timetable> {
    override fun getMapper(): Mapper<TimetableDto, Timetable> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Timetable {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}