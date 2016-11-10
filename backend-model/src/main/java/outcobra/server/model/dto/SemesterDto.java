package outcobra.server.model.dto;

import outcobra.server.model.Semester;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class SemesterDto implements MappableDto<SemesterDto, Semester> {
    @Override
    public Mapper<SemesterDto, Semester> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public Semester toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}