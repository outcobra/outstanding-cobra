package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.exception.ValidationKey
import outcobra.server.model.Exam
import outcobra.server.model.QExam
import outcobra.server.model.Semester
import outcobra.server.model.dto.ExamDto
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
 * @since <since>
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
        return readById(saveExamWithDependencies(dto))
    }

    private fun saveExamWithDependencies(dto: ExamDto): Long {
        val tasks = dto.examTasks
        dto.examTasks.drop(tasks.size)
        val savedDto = super.save(dto)
        repository.flush()
        tasks.forEach { it.examId = savedDto.id }
        examTaskService.saveAll(tasks)
        repository.flush()
        examTaskRepository.flush()
        return savedDto.id
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