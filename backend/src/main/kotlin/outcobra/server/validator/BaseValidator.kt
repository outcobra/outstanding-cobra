package outcobra.server.validator

import outcobra.server.exception.ValidationException
import outcobra.server.exception.ValidationKey
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.UserService
import outcobra.server.util.RepositoryLocator
import outcobra.server.util.followToUser
import kotlin.reflect.KClass

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
open class BaseValidator(val locator: RepositoryLocator, val userService: UserService) {
    /**
     * Extension-function to check if an instance of [ParentLinked] belongs to the current user.
     * @throws [ValidationException] if the owner is not the current user.
     */
    fun ParentLinked.checkOwnerIsCurrent() {
        if (this.followToUser() != userService.getCurrentUser()) {
            ValidationKey.FORBIDDEN.throwException()
        }
    }

    /**
     * This function allows authorizing requests by id
     * @param id the requested id
     * @param type [KClass] of the requested entity
     * @throws [ValidationException] if the current user is not allowed to make such a request
     */
    fun validateRequestById(id: Long, type: KClass<*>) {
        val repository = locator.getForEntityClass(type.java)
        val entity = repository.findOne(id)
        if (entity != null && entity is ParentLinked) {
            return entity.checkOwnerIsCurrent()
        }
        ValidationKey.FORBIDDEN.throwException()
    }


}