package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Task
import outcobra.server.model.dto.TaskDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SubjectRepository
import javax.inject.Inject

/**
 * @author Vincent Perret
 * @since 1.0.0
 */
@Component
class TaskMapper @Inject constructor(val subjectRepository: SubjectRepository,
                                     val subjectMapper: SubjectMapper) : Mapper<Task, TaskDto> {

    override fun toDto(from: Task): TaskDto {
        val subject = from.subject!!
        val effort = from.effort.toDouble().div(60)
        return TaskDto(from.id, subjectMapper.toDto(subject), from.name, from.description,
                from.todoDate, from.dueDate, effort, from.progress)
    }

    override fun fromDto(from: TaskDto): Task {
        val subject = subjectRepository.findOne(from.subject.id)
        val effort = Math.round(from.effort * 60).toInt()
        val task = Task(from.name, from.description, from.todoDate, from.dueDate, effort, from.progress, subject)
        task.id = from.id
        return task
    }
}
