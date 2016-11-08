package outcobra.server.model.dto.emptyDto

import outcobra.server.model.MarkReport
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.mapper.Mapper

class MarkReportDto : MappableDto<MarkReportDto, MarkReport> {
    override fun getMapper(): Mapper<MarkReportDto, MarkReport> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): MarkReport {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}