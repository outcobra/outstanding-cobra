package outcobra.server.service

import outcobra.server.model.Institution
import outcobra.server.model.SchoolClass
import outcobra.server.model.dto.SchoolClassDto

/**
 * This interface defines all functions for a SchoolClass service
 * @author Florian Bürgi
 * @since 1.0.0
 */
interface SchoolClassService {
    /**
     * This function creates a new [SchoolClass] and saves it
     * @param schoolClassDto the [SchoolClassDto] you want to save
     * @return the [SchoolClassDto] that has been saved
     */
    fun createSchoolClass(schoolClassDto: SchoolClassDto): SchoolClassDto

    /**
     * This function reads a [SchoolClassDto] from the database
     * @param id the id of the object you want to read
     * @return the [SchoolClassDto]
     */
    fun readSchoolClassById(id: Long): SchoolClassDto

    /**
     * Reads all [SchoolClass]es that are associated with a specific [Institution]
     * @param institutionId The id of the [Institution] of which the [SchoolClass]es should be read
     * @return a list of [SchoolClassDto]s
     */
    fun readAllSchoolClasses(institutionId: Long): List<SchoolClassDto>

    /**
     * This function updates an existing [SchoolClass]
     * @param schoolClassDto the changed [SchoolClassDto] you want to save
     * @return the [SchoolClassDto] that has been saved
     */
    fun updateSchoolClass(schoolClassDto: SchoolClassDto): SchoolClassDto

    /**
     * This function deletes a [SchoolClass]
     * @param id the id of the SchoolClass you want to delete
     */
    fun deleteSchoolClass(id: Long)

    fun readAllSchoolClassesByUser(): List<SchoolClassDto>
}