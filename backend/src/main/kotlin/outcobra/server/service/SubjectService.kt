package outcobra.server.service

import outcobra.server.model.Semester
import outcobra.server.model.Subject
import outcobra.server.model.dto.SubjectDto
import outcobra.server.service.base.BaseService

/**
 * This service handles the business-logic for the [Subject] entity
 * @since <since>
 * @author Florian Bürgi
 */
interface SubjectService : BaseService<SubjectDto> {
    /**
     * This function reads all [Subject]s from the given [Semester]
     * @param semesterId the id of the "parent" [Semester] you want to read
     * @return all [SubjectDto]s under the given [Semester]
     */
    fun readAllSubjectsBySemester(semesterId: Long): List<SubjectDto>

    /**
     * This function reads all [Subject]s from the current User
     * @return all [SubjectDto]s which belong to the current user
     */
    fun readAllSubjectsByUser(): List<SubjectDto>

    /**
     * reads all [SubjectDto]s which belong to a SchoolClass with the id [schoolClassId]
     * @return all [SubjectDto]s which belong to a SchoolClass
     */
    fun readSubjectsBySchoolClassId(schoolClassId: Long): List<SubjectDto>

    /**
     * reads all subjects by the current active semester
     * @return all [SubjectDto]s which are active now
     */
    fun readSubjectsByCurrentSemester(): List<SubjectDto>
}