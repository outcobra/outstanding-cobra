package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QTask
import outcobra.server.model.Task
import outcobra.server.model.dto.SchoolClassSubjects
import outcobra.server.model.dto.TaskDto
import outcobra.server.model.dto.TaskFilterDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.TaskRepository
import outcobra.server.service.SchoolClassService
import outcobra.server.service.SubjectService
import outcobra.server.service.TaskService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import javax.inject.Inject

@Component
@Transactional
open class DefaultTaskService
@Inject constructor(mapper: Mapper<Task, TaskDto>,
                    repository: TaskRepository,
                    val schoolClassService: SchoolClassService,
                    val subjectService: SubjectService,
                    val userService: UserService)
    : TaskService, DefaultBaseService<Task, TaskDto, TaskRepository>(mapper, repository) {

    override fun readAllTasks(): List<TaskDto> {
        val userId = userService.getCurrentUser()?.id
        val filter = QTask.task.subject.semester.schoolYear.schoolClass.institution.user.id.eq(userId)
        return jpaRepository.findAll(filter).map { dtoMapper.toDto(it) }
    }

    override fun readAllBySubject(subjectId: Long): List<TaskDto> {
        val filter = QTask.task.subject.id.eq(subjectId)
        return jpaRepository.findAll(filter).map { dtoMapper.toDto(it) }
    }

    override fun readAllBySemester(semesterId: Long): List<TaskDto> {
        val filter = QTask.task.subject.semester.id.eq(semesterId)
        return jpaRepository.findAll(filter).map { dtoMapper.toDto(it) }
    }

    override fun readAllOpenBySubject(subjectId: Long): List<TaskDto> {
        val filter = QTask.task.progress.ne(100).and(QTask.task.subject.id.eq(subjectId))
        return jpaRepository.findAll(filter).map { dtoMapper.toDto(it) }
    }

    override fun readAllOpenBySemester(semesterId: Long): List<TaskDto> {
        val filter = QTask.task.progress.ne(100).and(QTask.task.subject.semester.id.eq(semesterId))
        return jpaRepository.findAll(filter).map { dtoMapper.toDto(it) }
    }

    override fun getTaskFilter(): TaskFilterDto {
        return TaskFilterDto(schoolClassService.readAllSchoolClassesByUser().map {
            SchoolClassSubjects(it, subjectService.readSubjectsBySchoolClassId(it.id))
        })
    }
}