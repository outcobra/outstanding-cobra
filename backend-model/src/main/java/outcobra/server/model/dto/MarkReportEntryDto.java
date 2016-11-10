package outcobra.server.model.dto;

import outcobra.server.model.MarkReportEntry;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class MarkReportEntryDto implements MappableDto<MarkReportEntryDto, MarkReportEntry> {
    @Override
    public Mapper<MarkReportEntryDto, MarkReportEntry> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public MarkReportEntry toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}