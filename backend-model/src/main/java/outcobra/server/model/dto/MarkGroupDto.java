package outcobra.server.model.dto;

import outcobra.server.model.MarkGroup;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class MarkGroupDto implements MappableDto<MarkGroupDto, MarkGroup> {
    @Override
    public MarkGroup toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public Mapper<MarkGroupDto, MarkGroup> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }
}