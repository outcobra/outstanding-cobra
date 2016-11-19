package outcobra.server.service

import outcobra.server.model.dto.SchoolYearDto

/**
 * Service which contains all business logic for the SchoolYear entity
 *
 * @author Florian Bürgi
 * @since <since>
 */
interface SchoolYearService {
    /**
     * Saves a school year to the database
     * @param schoolYearDto The SchoolYear to save to the database
     * @return The saved SchoolYear with its new id
     */
    fun createSchoolYear(schoolYearDto: SchoolYearDto): SchoolYearDto

    /**
     * Reads a SchoolYear by its id
     * @param id The id of the SchoolYear to read
     * @return The SchoolYear with the given id or null if it does not exist
     */
    fun readSchoolYearById(id: Long): SchoolYearDto

    /**
     * Reads all SchoolYears that are associated with a specific SchoolClass
     * @param schoolClassId The id of the SchoolClass of which to read all SchoolYears
     * @return All SchoolYears that are associated with the given SchoolClass
     */
    fun readAllYearsByClass(schoolClassId: Long): List<SchoolYearDto>

    /**
     * Updates a SchoolYear entity
     * @param schoolYearDto The SchoolYear to update
     * @return The saved SchoolYear with all changes
     */
    fun updateSchoolYear(schoolYearDto: SchoolYearDto): SchoolYearDto

    /**
     * Deletes a SchoolYear by its id
     * @param id The id of the SchoolYear to delete
     */
    fun deleteSchoolYear(id: Long)
}