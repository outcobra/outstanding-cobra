package outcobra.server.model.dto.emptyDto

import outcobra.server.model.Task
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.mapper.Mapper

class TaskDto : MappableDto<TaskDto, Task> {
    override fun getMapper(): Mapper<TaskDto, Task> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Task {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}