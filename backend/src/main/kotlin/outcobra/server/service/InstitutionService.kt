package outcobra.server.service

import outcobra.server.model.Institution
import outcobra.server.model.dto.InstitutionDto

/**
 * Service which handles all the business logic for the [Institution] entity
 *
 * @author Florian Bürgi
 * @since <since>
 */
interface InstitutionService {
    /**
     * Reads all [Institution]s that are associated with the current user
     * @return A list with this users [Institution]s
     */
    fun readAllInstitutions(): List<InstitutionDto>

    /**
     * Reads an [Institution] by its unique id
     * @param id The id of the [Institution] to read
     * @return The [Institution] with the given id
     */
    fun readInstitutionById(id: Long): InstitutionDto

    /**
     * Deletes an [Institution] by its id
     * @param id The id of the [Institution] to delete
     */
    fun deleteInstitution(id: Long)

    /**
     * Saves a new [Institution] to the database
     * @param institutionDto The [Institution] to save
     * @return The saved [Institution] with its new id
     */
    fun createInstitution(institutionDto: InstitutionDto): InstitutionDto

    /**
     * Updates a preexisting [Institution]
     * @param institutionDto The [Institution] to update
     * @return The updated [Institution]
     */
    fun updateInstitution(institutionDto: InstitutionDto): InstitutionDto
}