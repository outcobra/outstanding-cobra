package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Task
import outcobra.server.model.dto.TaskDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SubjectRepository
import javax.inject.Inject

/**
 * @author Vincent Perret
 */
@Component
open class TaskDtoMapper @Inject constructor(val subjectRepository: SubjectRepository,
                                             val subjectMapper: SubjectMapper) : Mapper<Task, TaskDto> {

    override fun toDto(from: Task): TaskDto {
        return TaskDto(from.id, subjectMapper.toDto(from.subject), from.name, from.description, from.todoDate, from.dueDate, from.effort, from.progress)
    }

    override fun fromDto(from: TaskDto): Task {
        val subject = subjectRepository.findOne(from.subject.id)
        val task = Task(from.name, from.description, from.todoDate, from.dueDate, from.effort, from.progress, subject)
        task.id = from.id
        return task
    }
}
