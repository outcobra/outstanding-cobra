package outcobra.server.model.dto;

import outcobra.server.model.Timetable;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class TimetableDto implements MappableDto<TimetableDto, Timetable> {
    @Override
    public Mapper<TimetableDto, Timetable> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public Timetable toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}