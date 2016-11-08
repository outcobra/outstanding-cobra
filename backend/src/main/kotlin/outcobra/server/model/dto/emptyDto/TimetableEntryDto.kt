package outcobra.server.model.dto.emptyDto

import outcobra.server.model.TimetableEntry
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.mapper.Mapper

class TimetableEntryDto : MappableDto<TimetableEntryDto, TimetableEntry> {
    override fun getMapper(): Mapper<TimetableEntryDto, TimetableEntry> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): TimetableEntry {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}