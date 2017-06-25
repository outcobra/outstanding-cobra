package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.exception.ValidationKey
import outcobra.server.model.*
import outcobra.server.model.dto.ExamDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.ExamRepository
import outcobra.server.service.ExamService
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
                    requestValidator: RequestValidator<ExamDto>)
    : ExamService, DefaultBaseService<Exam, ExamDto, ExamRepository>(mapper, repository, requestValidator, Exam::class) {
    override fun readAll(): List<ExamDto> {
        val currentUser = requestValidator.userService.getCurrentUser()
        if (currentUser is User) {
            val filterByOwner = QExam.exam.subject.semester.schoolYear.schoolClass.institution.user.auth0Id.eq(currentUser.auth0Id)
            return repository.findAll(filterByOwner).map { mapper.toDto(it) }
        }
        ValidationKey.FORBIDDEN.throwException()
    }

    override fun readAllBySemester(semesterId: Long): List<ExamDto> {
        requestValidator.validateRequestById(semesterId, Semester::class)
        val filterBySemester = QExam.exam.subject.semester.id.eq(semesterId)
        return repository.findAll(filterBySemester).map { mapper.toDto(it) }
    }
}