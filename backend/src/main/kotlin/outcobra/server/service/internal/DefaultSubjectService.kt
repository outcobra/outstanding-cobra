package outcobra.server.service.internal

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.repository.SubjectRepository
import outcobra.server.service.SubjectService
import javax.inject.Inject

/**
 * Created by Florian on 26.11.2016.
 */
@Service
@Transactional
open class DefaultSubjectService @Inject constructor(val repoitory: SubjectRepository) : SubjectService {
    override fun createSubject(subjectDto: SubjectDto): SubjectDto {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun readAllSubjectsByInstitution(institutionId: Long): List<SubjectDto> {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun readSubjectById(subjectId: Long): SubjectDto {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun updateSubject(subjectDto: SubjectDto): SubjectDto {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun deleteSubject(subjectId: Long) {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
//TODO Implement
}