package outcobra.server.validator

import org.springframework.stereotype.Component
import outcobra.server.exception.ValidationException
import outcobra.server.exception.ValidationKey
import outcobra.server.model.User
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.UserService
import outcobra.server.service.base.BaseService
import outcobra.server.util.RepositoryLocator
import outcobra.server.util.followToUser
import javax.inject.Inject
import kotlin.reflect.KClass

/**
 * A service to validate all requests on a very basic level
 * meant to be used inside the BaseService
 * @see BaseService
 * @author Florian Bürgi
 * @since 1.1.0
 */
@Component
open class RequestValidator<in Dto>
@Inject constructor(val locator: RepositoryLocator, val userService: UserService)
where Dto : OutcobraDto {

    /**
     * This function allows authorizing requests to save (create or update) a [Dto]
     * @param dto the object the user wants to save
     * @throws [ValidationException] if the current user is not allowed to make such a request
     */
    fun validateDtoSaving(dto: Dto) {
        return dto.checkOwnerIsCurrent()
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


    /**
     * Extension-function to check if an instance of [OutcobraDto] belongs to the current user.
     * @throws [ValidationException] if the owner is not the current user
     *  or if the ownership of an existing entity has changed.
     */
    private fun Dto.checkOwnerIsCurrent() {
        val repository = locator.getForDto(this)
        val parentLink = this.parentLink
        val parentRepository = locator.getForEntityClass(parentLink.parentClass)
        val parent: ParentLinked? = parentRepository.findOne(parentLink.id)

        if (parentLink.id == 0L && this is InstitutionDto) {
            return
        }

        if (repository.exists(this.identifier)) {
            val currentEntity = repository.findOne(this.identifier) as ParentLinked
            val parentHasChanged = this.parentLink.id != currentEntity.id
            if (parentHasChanged) currentEntity.checkOwnerIsCurrent()
        } else if (parentLink.parentClass == User::class.java) {
            //if this entity is new and directly connected to the user we are able to link it automatically
            return
        }
        if (parent == null) {
            ValidationKey.FORBIDDEN.throwException()
        } else {
            parent.checkOwnerIsCurrent()
        }
    }

    /**
     * Extension-function to check if an instance of [ParentLinked] belongs to the current user.
     * @throws [ValidationException] if the owner is not the current user.
     */
    fun ParentLinked.checkOwnerIsCurrent() {
        if (this.followToUser() != userService.getCurrentUser()) {
            ValidationKey.FORBIDDEN.throwException()
        }
    }
}
