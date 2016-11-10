package outcobra.server.model.dto;

import outcobra.server.model.Task;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class TaskDto implements MappableDto<TaskDto, Task> {
    @Override
    public Mapper<TaskDto, Task> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public Task toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}