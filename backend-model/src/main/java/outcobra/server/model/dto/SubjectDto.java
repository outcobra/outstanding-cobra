package outcobra.server.model.dto;

import outcobra.server.model.Subject;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class SubjectDto implements MappableDto<SubjectDto, Subject> {
    @Override
    public Mapper<SubjectDto, Subject> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public Subject toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}