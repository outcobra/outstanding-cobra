package outcobra.server.model.dto;

import outcobra.server.model.Institution;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class InstitutionDto implements MappableDto<InstitutionDto, Institution> {
    @Override
    public Mapper<InstitutionDto, Institution> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public Institution toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}