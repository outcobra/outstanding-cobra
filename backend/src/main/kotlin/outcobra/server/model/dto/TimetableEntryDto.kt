package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.TimetableEntry
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class TimetableEntryDto : MappableDto<TimetableEntryDto, TimetableEntry> {
    override fun getMapper(): Mapper<TimetableEntryDto, TimetableEntry> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): TimetableEntry {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}