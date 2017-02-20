package outcobra.server.validator

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component
import outcobra.server.exception.ManipulatedRequestException
import outcobra.server.model.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.model.interfaces.ParentLinkedDto
import outcobra.server.service.UserService
import outcobra.server.service.base.BaseService
import outcobra.server.util.RepositoryLocator
import javax.inject.Inject
import kotlin.reflect.KClass

/**
 * A service to validate all requests on a very basic level
 * meant to be used inside the BaseService
 * @see BaseService
 * @author Florian Bürgi
 * @since <since>
 */
@Component
open class RequestValidator<in Dto>
where Dto : OutcobraDto {

    @Inject
    lateinit var userService: UserService

    @Inject
    lateinit var locator: RepositoryLocator

    fun validateByParentId(parentId: Long, parentType: KClass<*>) {
        val name = parentType.simpleName
        if (name != null) {
            val parentRepository = locator.getForEntityName(name)
            val parent = parentRepository.findOne(parentId)
            if (parent is ParentLinked) return parent.checkOwnerIsCurrent()
        }
        throw ManipulatedRequestException()
    }

    fun validateDtoSaving(dto: Dto) {
        val repository = getRepoByDto(dto)
        val isUpdate = repository.exists(dto.identifier)
        if (!isUpdate) return

        return dto.checkOwnerIsCurrent()
    }


    fun validateRequestById(id: Long, type: Class<*>) {
        var name = type.simpleName
        if (name != null) {
            name.replace("Dto", "")
            val repository = locator.getForEntityName(name)
            val entity = repository.findOne(id)
            if (entity != null && entity is ParentLinked) {
                return entity.checkOwnerIsCurrent()
            }
        }
        throw ManipulatedRequestException()
    }

    tailrec private fun followToUser(link: ParentLinked): User {
        if (link is User) return link
        return followToUser(link.parent)
    }

    private fun ParentLinkedDto.checkOwnerIsCurrent() {
        val parentLink = this.parentLink
        val repo = locator.getForEntityClass(parentLink.parentClass)
        val parent: ParentLinked? = repo.findOne(parentLink.id)
        if (parent == null || (parent) != userService.getCurrentUser()) {
            throw ManipulatedRequestException()
        }
    }


    fun ParentLinked.checkOwnerIsCurrent() {
        if (followToUser(this) != userService.getCurrentUser()) {
            throw ManipulatedRequestException()
        }
    }

    private fun getRepoByDto(dto: Dto): JpaRepository<*, Long> {
        var name = dto.javaClass.simpleName
        name.replace("Dto", "")
        return locator.getForEntityName(name)

    }
}
