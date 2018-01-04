package outcobra.server.model.mapper

import outcobra.server.model.TimetableEntry
import outcobra.server.model.dto.timetable.TimetableEntryDto
import outcobra.server.model.interfaces.Mapper

/**
 * @author Florian Bürgi
 * @since <since>
 */
class TimetableEntryMapper : Mapper<TimetableEntry, TimetableEntryDto>, BaseMapper() {

    override fun fromDto(from: TimetableEntryDto?): TimetableEntry {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun toDto(from: TimetableEntry?): TimetableEntryDto {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}