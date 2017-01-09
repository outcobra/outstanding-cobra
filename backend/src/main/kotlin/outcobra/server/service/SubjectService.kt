package outcobra.server.service

import outcobra.server.model.Semester
import outcobra.server.model.Subject
import outcobra.server.model.dto.SubjectDto

/**
 * This service handles the business-logic for the [Subject] entity
 * @since <since>
 * @author Florian Bürgi
 */
interface SubjectService {
    /**
     * This function saves a new [Subject]
     * @param subjectDto the [SubjectDto] you want to store in the database
     * @return the stored [SubjectDto] (with id)
     */
    fun createSubject(subjectDto: SubjectDto): SubjectDto

    /**
     * This function reads all [Subject]s from the given [Semester]
     * @param semesterId the id of the "parent" [Semester] you want to read
     * @return all [SubjectDto]s under the given [Semester]
     */
    fun readAllSubjectsBySemester(semesterId: Long): List<SubjectDto>

    /**
     * This function reads a [Subject] based on its subjectId
     * @param subjectId the subjectId of the element you want to get
     * @return the [Subject] with the given subjectId -> null if the subjectId does not exist
     */
    fun readSubjectById(subjectId: Long): SubjectDto

    /**
     * This function updates an existing [Subject]
     * @param subjectDto the [SubjectDto] you want to save (with changes)
     * @return the stored [SubjectDto]
     */
    fun updateSubject(subjectDto: SubjectDto): SubjectDto

    /**
     * This function deletes a [Subject] based on its id
     * @param subjectId the id of the element you want to delete
     */
    fun deleteSubject(subjectId: Long)

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