package outcobra.server.model.dto

import noutcobra.server.model.mapper.MappableDto
import outcobra.server.model.Task
import outcobra.server.model.mapper.Mapper

/**
 * Created by Florian on 04.11.2016.
 */
class TaskDto : MappableDto<TaskDto, Task> {
    override fun getMapper(): Mapper<TaskDto, Task> {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun toEntity(): Task {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
//TODO Implement
}