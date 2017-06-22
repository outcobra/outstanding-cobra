package outcobra.server.service.internal

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.*
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.repository.SubjectRepository
import outcobra.server.service.SemesterService
import outcobra.server.service.SubjectService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject


@Service
@Transactional
class DefaultSubjectService
@Inject constructor(mapper: Mapper<Subject, SubjectDto>,
                    repository: SubjectRepository,
                    requestValidator: RequestValidator<OutcobraDto>,
                    val userService: UserService,
                    val semesterService: SemesterService) : SubjectService,
        DefaultBaseService<Subject, SubjectDto, SubjectRepository>(mapper,
                repository,
                requestValidator,
                Subject::class) {

    override fun readAllByCurrentSemester(): List<SubjectDto> {
        val currentSemesters = semesterService.getCurrentSemester()
        return currentSemesters.flatMap { readAllBySemester(it.id) }
    }

    override fun readAllByUser(): List<SubjectDto> {
        val userId = userService.getCurrentUser()?.id
        val filter = QSubject.subject.semester.schoolYear.schoolClass.institution.user.id.eq(userId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllBySemester(semesterId: Long): List<SubjectDto> {
        requestValidator.validateRequestById(semesterId, Semester::class)
        val filter = QSubject.subject.semester.id.eq(semesterId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllBySchoolClass(schoolClassId: Long): List<SubjectDto> {
        requestValidator.validateRequestById(schoolClassId, SchoolClass::class)
        val filter = QSubject.subject.semester.schoolYear.schoolClass.id.eq(schoolClassId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }
}