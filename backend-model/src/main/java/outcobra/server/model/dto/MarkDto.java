package outcobra.server.model.dto;

import outcobra.server.model.Mark;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class MarkDto implements MappableDto<MarkDto, Mark> {
    @Override
    public Mapper<MarkDto, Mark> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public Mark toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}