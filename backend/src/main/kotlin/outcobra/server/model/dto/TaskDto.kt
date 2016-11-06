package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.Task
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class TaskDto : MappableDto<TaskDto, Task> {
    override fun getMapper(): Mapper<TaskDto, Task> {
        throw UnsupportedOperationException("not implemented")
    }

    override fun toEntity(): Task {
        throw UnsupportedOperationException("not implemented")
    }
//TODO Implement
}