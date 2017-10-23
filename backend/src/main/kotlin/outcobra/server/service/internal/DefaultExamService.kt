package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.exception.ValidationKey
import outcobra.server.model.Exam
import outcobra.server.model.QExam
import outcobra.server.model.Semester
import outcobra.server.model.dto.ExamDto
import outcobra.server.model.dto.ExamTaskDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.ExamRepository
import outcobra.server.model.repository.ExamTaskRepository
import outcobra.server.service.ExamService
import outcobra.server.service.ExamTaskService
import outcobra.server.service.SemesterService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Service
class DefaultExamService
@Inject constructor(mapper: Mapper<Exam, ExamDto>,
                    repository: ExamRepository,
                    requestValidator: RequestValidator<ExamDto>,
                    val semesterService: SemesterService,
                    val examTaskRepository: ExamTaskRepository,
                    val examTaskService: ExamTaskService)
    : ExamService, DefaultBaseService<Exam, ExamDto, ExamRepository>(mapper, repository, requestValidator, Exam::class) {

    override fun readAll(): List<ExamDto> {
        val currentUser = requestValidator.userService.getCurrentUser()
        if (currentUser != null) {
            val filterByOwner = QExam.exam.subject.semester.schoolYear.schoolClass.institution.user.auth0Id.eq(currentUser.auth0Id)
            val exams = repository.findAll(filterByOwner)
            return exams.map { mapper.toDto(it) }
        }
        ValidationKey.FORBIDDEN.throwException()
    }

    override fun save(dto: ExamDto): ExamDto {
        return readById(when (dto.id) {
            0L -> createExam(dto)
            else -> createExam(dto)
        })
    }

    private fun createExam(dto: ExamDto): Long {
        val tasks = dto.examTasks.toList()
        dto.examTasks.clear()

        val savedDto = super.save(dto)
        updateOrSaveExamTasks(tasks, savedDto.id)
        return savedDto.id
    }

    private fun updateOrSaveExamTasks(tasks: List<ExamTaskDto>, examId: Long) {
        if (tasks.all { it.id == 0L }) {
            tasks.forEach { this.saveExamTaskWithNewId(it, examId) }
            return
        }
        val oldTasks = examTaskService.readByExamId(examId).toMutableList()
        oldTasks.removeIf { task ->
            tasks.any { it.id == task.id }
        }
        oldTasks.map { it.id }.forEach(examTaskService::delete)
        examTaskService.saveAll(tasks)
    }

    private fun saveExamTaskWithNewId(dto: ExamTaskDto, examId: Long) {
        dto.examId = examId
        examTaskService.save(dto)
    }

    override fun readAllBySemester(semesterId: Long): List<ExamDto> {
        requestValidator.validateRequestById(semesterId, Semester::class)
        val filterBySemester = QExam.exam.subject.semester.id.eq(semesterId)
        return repository.findAll(filterBySemester).map { mapper.toDto(it) }
    }

    override fun readAllInActiveSemesters(): List<ExamDto> {
        val exams = listOf<ExamDto>()
        semesterService.getCurrentSemester().map { it.id }.forEach { exams.plus(readAllBySemester(it)) }
        return exams
    }
}