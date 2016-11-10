package outcobra.server.model.dto;

import outcobra.server.model.TimetableEntry;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class TimetableEntryDto implements MappableDto<TimetableEntryDto, TimetableEntry> {
    @Override
    public Mapper<TimetableEntryDto, TimetableEntry> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public TimetableEntry toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}