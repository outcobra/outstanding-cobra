package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QTask
import outcobra.server.model.Semester
import outcobra.server.model.Subject
import outcobra.server.model.Task
import outcobra.server.model.dto.SchoolClassSubjects
import outcobra.server.model.dto.TaskDto
import outcobra.server.model.dto.TaskFilterDto
import outcobra.server.model.dto.TaskProgressUpdateDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.TaskRepository
import outcobra.server.service.SchoolClassService
import outcobra.server.service.SubjectService
import outcobra.server.service.TaskService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

@Component
@Transactional
open class DefaultTaskService
@Inject constructor(mapper: Mapper<Task, TaskDto>,
                    repository: TaskRepository,
                    requestValidator: RequestValidator<TaskDto>,
                    val schoolClassService: SchoolClassService,
                    val subjectService: SubjectService,
                    val userService: UserService) : TaskService,
        DefaultBaseService<Task, TaskDto, TaskRepository>(mapper,
                repository,
                requestValidator,
                Task::class) {

    override fun readAll(): List<TaskDto> {
        val userId = userService.getCurrentUser()?.id
        val filter = QTask.task.subject.semester.schoolYear.schoolClass.institution.user.id.eq(userId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllBySubject(subjectId: Long): List<TaskDto> {
        val filter = QTask.task.subject.id.eq(subjectId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllBySemester(semesterId: Long): List<TaskDto> {
        requestValidator.validateRequestById(semesterId, Semester::class)
        val filter = QTask.task.subject.semester.id.eq(semesterId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllOpenBySubject(subjectId: Long): List<TaskDto> {
        requestValidator.validateRequestById(subjectId, Subject::class)
        val filter = QTask.task.progress.ne(100).and(QTask.task.subject.id.eq(subjectId))
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllOpenBySemester(semesterId: Long): List<TaskDto> {
        requestValidator.validateRequestById(semesterId, Semester::class)
        val filter = QTask.task.progress.ne(100).and(QTask.task.subject.semester.id.eq(semesterId))
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun getTaskFilter(): TaskFilterDto {
        return TaskFilterDto(schoolClassService.readAllByUser().map {
            SchoolClassSubjects(it, subjectService.readAllBySchoolClass(it.id))
        })
    }

    override fun updateProgress(taskProgressUpdateDto: TaskProgressUpdateDto): TaskDto {
        requestValidator.validateRequestById(taskProgressUpdateDto.taskId, Task::class)
        val task = repository.findOne(taskProgressUpdateDto.taskId)
        task.progress = taskProgressUpdateDto.progress
        return mapper.toDto(repository.save(task))
    }
}