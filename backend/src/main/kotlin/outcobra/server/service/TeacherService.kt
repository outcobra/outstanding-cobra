package outcobra.server.service

import outcobra.server.model.dto.TeacherDto

/**
 * Service which handles all business logic and data for Teacher entities
 *
 * @author Florian Bürgi
 * @since 1.0.0
 */
interface TeacherService {
    /**
     * Saves a new teacher to the database
     * @param teacherDto Teacher to save
     * @return The saved teacher with the new id
     */
    fun createTeacher(teacherDto: TeacherDto): TeacherDto

    /**
     * Loads a Teacher from the database
     * @param id The id of the teacher to load
     * @return The requested teacher or null if the teacher does not exist
     */
    fun readTeacherById(id: Long): TeacherDto

    /**
     * Returns all Teachers that are associated to a specific Institution
     * @param institutionId The id of the Institution of which the Teachers should be retrieved
     * @return A list of Teachers that are associated with the given Institution
     */
    fun readAllYearsByInstitution(institutionId: Long): List<TeacherDto>

    /**
     * Update a already existing teacher
     * @param teacherDto The dto of the teacher to update
     * @return The saved Teacher
     */
    fun updateTeacher(teacherDto: TeacherDto): TeacherDto

    /**
     * Deletes a Teacher by its unique id
     * @param id The id of the Teacher that should be deleted
     */
    fun deleteTeacher(id: Long)
}