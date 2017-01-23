package outcobra.server.service.base

/**
 * This service defines a basic crud functionality.
 * create and update are covered by the save method
 * Every service should extend this interface
 * @author Florian Bürgi
 * @since <version>
 */
interface BaseService<Dto> {
    /**
     * This function saves the given dto
     * This function can be used for creation und updating
     * @param dto the [Dto] you want so save
     */
    fun save(dto: Dto): Dto

    /**
     * This function returns the [Dto] for the given id
     * @param id the id of the entity you want to get
     * @return the [Dto] of the entity with the given id
     */
    fun readById(id: Long): Dto

    /**
     * This function deletes the entity with the given id
     * @param id the id of the entity you want to delete
     */
    fun delete(id: Long)
}