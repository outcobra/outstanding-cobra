package outcobra.server.model.dto

import outcobra.server.model.domain.Institution
import outcobra.server.model.domain.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink


/**
 * This is a kotlin data class. They need to have a primary constructor.
 * Kotlin will generate instance fields with getters and setters for every parameter within the primary constructor
 * This is a DTO. DTOs are serializable and the only thing that will be sent over the network.
 * In this case it represents an [Institution].
 *
 * For instance field information please check the model class.
 * @see Institution
 */
data class InstitutionDto(val id: Long = 0,
                          val userId: Long = 0,
                          val name: String = "",
                          val schoolClassIds: List<Long> = arrayListOf()) : OutcobraDto {
    /**
     * This function returns the objects unique identifier.
     * This identifier is equal to the primary key of the object in the database
     */
    override val identifier: Long
        get() = id

    /**
     * This function is defined in the [OutcobraDto] interface.
     * This function is used to verify the ownership of an entity.
     */
    override val parentLink: ParentLink
        get() = ParentLink.make(userId, User::class.java)
}