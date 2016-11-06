package outcobra.server.model.dto

import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.MarkReport
import outcobra.server.model.MarkReportEntry
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class MarkReportEntryDto : MappableDto<MarkReportEntryDto, MarkReportEntry> {
    override fun getMapper(): Mapper<MarkReportEntryDto, MarkReportEntry> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): MarkReportEntry {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}