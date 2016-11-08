package outcobra.server.model.dto.emptyDto

import outcobra.server.model.MarkReportEntry
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.mapper.Mapper

class MarkReportEntryDto : MappableDto<MarkReportEntryDto, MarkReportEntry> {
    override fun getMapper(): Mapper<MarkReportEntryDto, MarkReportEntry> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): MarkReportEntry {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}