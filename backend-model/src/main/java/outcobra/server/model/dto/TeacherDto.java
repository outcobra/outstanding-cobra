package outcobra.server.model.dto;

import outcobra.server.model.Teacher;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class TeacherDto implements MappableDto<TeacherDto, Teacher> {
    @Override
    public Mapper<TeacherDto, Teacher> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public Teacher toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}