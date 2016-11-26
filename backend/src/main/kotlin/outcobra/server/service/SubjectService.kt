package outcobra.server.service

import outcobra.server.model.dto.SubjectDto

/**
 * Created by Florian on 26.11.2016.
 */
interface SubjectService {
    fun createSubject(subjectDto: SubjectDto): SubjectDto
    fun readAllSubjectsByInstitution(institutionId: Long) :List<SubjectDto>
    fun readSubjectById(subjectId: Long): SubjectDto
    fun updateSubject(subjectDto: SubjectDto): SubjectDto
    fun deleteSubject(subjectId: Long)
}