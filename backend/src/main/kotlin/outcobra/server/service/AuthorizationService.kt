package outcobra.server.service

import outcobra.server.model.interfaces.ParentLink
import outcobra.server.model.interfaces.ParentLinked

interface AuthorizationService {
    fun getParentLinkedEntityOf(id: Long, entityName: String): ParentLinked
    fun verifyDto(dtoString: String, entityName: String, new: Boolean): Boolean
    fun verifyOwner(linked: ParentLinked): Boolean
    open fun verifyOwner(link: ParentLink): Boolean
}