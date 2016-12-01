package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Task
import outcobra.server.model.dto.TaskDto
import outcobra.server.model.interfaces.Mapper

/**
 * Created by Vincent on 25.11.2016.
 */
@Component
open class TaskDtoMapper : Mapper<Task, TaskDto> {

    override fun toDto(from: Task): TaskDto {
        return TaskDto()
    }

    override fun fromDto(from: TaskDto): Task {
        return Task()
    }
}
