package outcobra.server.service

import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto

/**
 * Service which handles the business logic and data for [Semester]s
 *
 * @author Florian Bürgi
 * @since <since>
 */
interface SemesterService {
    /**
     * Saves the given dto to the database
     * @param semesterDto The dto to save to the database
     * @return The saved Semester with its new id
     */
    fun createSemester(semesterDto: SemesterDto): SemesterDto

    /**
     * Reads one semester with the given id from the database
     * @param id The id of the Semester to read
     * @return The requested Semester or null if it does not exist
     */
    fun readSemesterById(id: Long): SemesterDto

    /**
     * Reads all semesters that are associated with a specific SchoolYear
     * @param schoolYearId The id of the SchoolYear of which to retrieve all semesters
     * @return All semesters that are associated with the given SchoolYear
     */
    fun readAllSemestersBySchoolYear(schoolYearId: Long): List<SemesterDto>

    /**
     * Updates an existing semester
     * @param semesterDto The SemesterDto to update the existing semester with
     * @return The updated Semester from the database
     */
    fun updateSemester(semesterDto: SemesterDto): SemesterDto

    /**
     * Deletes a Semester by its id
     * @param id The id of the Semester to delete
     */
    fun deleteSemester(id: Long)
}