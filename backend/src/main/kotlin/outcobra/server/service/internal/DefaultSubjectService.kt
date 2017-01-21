package outcobra.server.service.internal

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QSubject
import outcobra.server.model.Subject
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SubjectRepository
import outcobra.server.service.SemesterService
import outcobra.server.service.SubjectService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import javax.inject.Inject


@Service
@Transactional
open class DefaultSubjectService
@Inject constructor(val mapper: Mapper<Subject, SubjectDto>,
                    val repository: SubjectRepository,
                    val userService: UserService,
                    val semesterService: SemesterService)
    : SubjectService, DefaultBaseService<Subject, SubjectDto>(mapper, repository) {

    override fun readSubjectsByCurrentSemester(): List<SubjectDto> {
        val currentSemesters = semesterService.getCurrentSemester()
        return currentSemesters.flatMap { readAllSubjectsBySemester(it.id) }
    }

    override fun readAllSubjectsByUser(): List<SubjectDto> {
        val userId = userService.getCurrentUser()?.id
        val filter = QSubject.subject.semester.schoolYear.schoolClass.institution.user.id.eq(userId)
        return repository.findAll(filter).map { dtoMapper.toDto(it) }
    }

    override fun readAllSubjectsBySemester(semesterId: Long): List<SubjectDto> {
        val filter = QSubject.subject.semester.id.eq(semesterId)
        return repository.findAll(filter).map { dtoMapper.toDto(it) }
    }

    override fun readSubjectsBySchoolClassId(schoolClassId: Long): List<SubjectDto> {
        val filter = QSubject.subject.semester.schoolYear.schoolClass.id.eq(schoolClassId)
        return repository.findAll(filter).map { dtoMapper.toDto(it) }
    }
}