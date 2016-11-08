package outcobra.server.model.dto.emptyDto

import outcobra.server.model.Timetable
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.mapper.Mapper

class TimetableDto : MappableDto<TimetableDto, Timetable> {
    override fun getMapper(): Mapper<TimetableDto, Timetable> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Timetable {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}