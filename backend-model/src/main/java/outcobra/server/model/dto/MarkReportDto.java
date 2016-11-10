package outcobra.server.model.dto;

import outcobra.server.model.MarkReport;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class MarkReportDto implements MappableDto<MarkReportDto, MarkReport> {
    @Override
    public Mapper<MarkReportDto, MarkReport> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public MarkReport toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}