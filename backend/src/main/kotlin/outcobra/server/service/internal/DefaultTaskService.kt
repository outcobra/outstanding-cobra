package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QTask
import outcobra.server.model.Task
import outcobra.server.model.dto.TaskDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.TaskRepository
import outcobra.server.service.TaskService
import outcobra.server.service.UserService
import java.time.LocalDate
import javax.inject.Inject

/**
 * Created by Vincent on 15.11.2016.
 */
@Component
@Transactional
open class DefaultTaskService @Inject constructor(val repository: TaskRepository,
                                                  val mapper: Mapper<Task, TaskDto>,
                                                  val userService: UserService) : TaskService {
    override fun createTask(taskDto: TaskDto): TaskDto {
        var task = mapper.fromDto(taskDto)
        task = repository.save(task)
        return mapper.toDto(task)
    }

    override fun updateTask(taskDto: TaskDto): TaskDto {
        var task = mapper.fromDto(taskDto)
        task = repository.save(task)
        return mapper.toDto(task)
    }

    override fun readTaskById(id: Long): TaskDto {
        return mapper.toDto(repository.findOne(id))
    }

    override fun readAllTasksOfSubject(subjectId: Long): List<TaskDto> {
        val filter = QTask.task.subject.id.eq(subjectId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllTasksOfSemester(semesterId: Long): List<TaskDto> {
        val filter = QTask.task.subject.semester.id.eq(semesterId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }


    override fun readAllOpenTasksBySubject(subjectId: Long): List<TaskDto> {
        val filter = QTask.task.dueDate.after(LocalDate.now()).and(QTask.task.subject.id.eq(subjectId))
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllOpenTasksBySemester(semesterId: Long): List<TaskDto> {
        val filter = QTask.task.dueDate.after(LocalDate.now()).and(QTask.task.subject.semester.id.eq(semesterId))
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun deleteTask(id: Long) {
        repository.delete(id)
    }
}