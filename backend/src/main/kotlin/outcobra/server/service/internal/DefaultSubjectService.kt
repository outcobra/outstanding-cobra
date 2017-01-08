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
import javax.inject.Inject


@Service
@Transactional
open class DefaultSubjectService @Inject constructor(val repository: SubjectRepository,
                                                     val userService: UserService,
                                                     val semesterService: SemesterService,
                                                     val mapper: Mapper<Subject, SubjectDto>) : SubjectService {
    override fun readSubjectsByCurrentSemester(): List<SubjectDto> {
        val currentSemester = semesterService.getCurrentSemester() ?: return listOf()
        return readAllSubjectsBySemester(currentSemester.id)
    }

    override fun readAllSubjectsByUser(): List<SubjectDto> {
        val userId = userService.getCurrentUser()?.id
        val filter = QSubject.subject.semester.schoolYear.schoolClass.institution.user.id.eq(userId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun createSubject(subjectDto: SubjectDto): SubjectDto {
        return mapper.toDto(repository.save(mapper.fromDto(subjectDto)))
    }

    override fun readAllSubjectsBySemester(semesterId: Long): List<SubjectDto> {
        val filter = QSubject.subject.semester.id.eq(semesterId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readSubjectById(subjectId: Long): SubjectDto {
        return mapper.toDto(repository.getOne(subjectId))
    }

    override fun updateSubject(subjectDto: SubjectDto): SubjectDto {
        return mapper.toDto(repository.save(mapper.fromDto(subjectDto)))
    }

    override fun deleteSubject(subjectId: Long) {
        repository.delete(subjectId)
    }

    override fun readSubjectsBySchoolClassId(schoolClassId: Long): List<SubjectDto> {
        val filter = QSubject.subject.semester.schoolYear.schoolClass.id.eq(schoolClassId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }
}