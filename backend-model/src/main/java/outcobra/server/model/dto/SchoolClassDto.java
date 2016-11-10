package outcobra.server.model.dto;

import outcobra.server.model.SchoolClass;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class SchoolClassDto implements MappableDto<SchoolClassDto, SchoolClass> {
    @Override
    public Mapper<SchoolClassDto, SchoolClass> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public SchoolClass toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}