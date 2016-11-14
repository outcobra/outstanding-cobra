package outcobra.server.service

import outcobra.server.model.interfaces.ParentLinked

interface AuthorizationService {
    fun getParentLinkedEntityOf(id: Long, entityName: String): ParentLinked
    fun verifyDto(dtoString: String, entityName: String, new: Boolean): Boolean
    fun verifyOwner(link: ParentLinked): Boolean
}