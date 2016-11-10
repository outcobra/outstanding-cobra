package outcobra.server.model.dto;

import outcobra.server.model.ExamTask;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class ExamTaskDto implements MappableDto<ExamTaskDto, ExamTask> {
    @Override
    public Mapper<ExamTaskDto, ExamTask> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public ExamTask toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}