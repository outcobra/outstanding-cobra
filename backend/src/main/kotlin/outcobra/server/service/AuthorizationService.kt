package outcobra.server.service

import outcobra.server.model.interfaces.ParentLink

interface AuthorizationService {
    fun parentLinkOf(id: Long, entityName: String): ParentLink<*>
    fun <T> verifyOwner(link: ParentLink<T>): Boolean
}