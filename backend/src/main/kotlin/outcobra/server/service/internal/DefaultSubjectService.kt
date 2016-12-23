package outcobra.server.service.internal

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QSubject
import outcobra.server.model.Subject
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SubjectRepository
import outcobra.server.service.SubjectService
import javax.inject.Inject


@Service
@Transactional
open class DefaultSubjectService @Inject constructor(val repository: SubjectRepository,
                                                     val mapper: Mapper<Subject, SubjectDto>) : SubjectService {
    override fun createSubject(subjectDto: SubjectDto): SubjectDto {
        return mapper.toDto(repository.save(mapper.fromDto(subjectDto)))
    }

    override fun readAllSubjectsBySemester(semesterId: Long): List<SubjectDto> {
        val filter = QSubject.subject.semester.id.eq(semesterId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readSubjectById(id: Long): SubjectDto {
        return mapper.toDto(repository.findOne(id))
    }

    override fun updateSubject(subjectDto: SubjectDto): SubjectDto {
        return mapper.toDto(repository.save(mapper.fromDto(subjectDto)))
    }

    override fun deleteSubject(subjectId: Long) {
        repository.delete(subjectId)
    }
}