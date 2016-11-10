package outcobra.server.model.dto;

import outcobra.server.model.SchoolYear;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class SchoolYearDto implements MappableDto<SchoolYearDto, SchoolYear> {
    @Override
    public Mapper<SchoolYearDto, SchoolYear> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public SchoolYear toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}