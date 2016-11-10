package outcobra.server.model.dto;

import outcobra.server.model.Exam;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class ExamDto implements MappableDto<ExamDto, Exam> {
    @Override
    public Exam toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public Mapper<ExamDto, Exam> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }
}