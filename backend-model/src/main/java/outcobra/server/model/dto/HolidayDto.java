package outcobra.server.model.dto;

import outcobra.server.model.Holiday;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class HolidayDto implements MappableDto<HolidayDto, Holiday> {
    @Override
    public Mapper<HolidayDto, Holiday> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public Holiday toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}