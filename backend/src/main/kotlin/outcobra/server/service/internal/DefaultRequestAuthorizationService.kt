package outcobra.server.service.internal

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QueryDslPredicateExecutor
import org.springframework.stereotype.Component
import outcobra.server.exception.ManipulatedRequestException
import outcobra.server.model.User
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.RequestAuthorizationService
import outcobra.server.service.UserService
import outcobra.server.service.base.BaseService
import outcobra.server.util.RepositoryLocator
import javax.inject.Inject
import kotlin.reflect.KClass

/**
 * A service to validate all requests on a very basic level
 * meant to be used inside the BaseService
 * @see BaseService
 * @author Florian Büri
 * @since <since>
 */
@Component
open class DefaultRequestAuthorizationService<Entity, Dto, out Repo>
constructor(val mapper: Mapper<Entity, Dto>, val repository: Repo) : RequestAuthorizationService<Entity, Dto, Repo>
where Repo : JpaRepository<Entity, Long>, Repo : QueryDslPredicateExecutor<Entity>, Dto : OutcobraDto, Entity : ParentLinked {

    @Inject
    lateinit var userService: UserService

    @Inject
    lateinit var locator: RepositoryLocator

    override fun validateByParentId(parentId: Long, parentType: KClass<*>) {
        val name = parentType.simpleName
        if (name != null) {
            val parentRepository = locator.getForEntityName(name)
            val parent = parentRepository.findOne(parentId)
            if (parent is ParentLinked) return parent.checkOwnerIsCurrent()
        }
        throw ManipulatedRequestException()
    }

    override fun validateDtoSaving(dto: Dto) {
        val isUpdate = repository.exists(dto.identifier)
        if (!isUpdate) return
        val entity = mapper.fromDto(dto)
        return entity.checkOwnerIsCurrent()
    }

    override fun validateRequestById(id: Long) {
        val entity = repository.findOne(id)
        if (entity != null) {
            return entity.checkOwnerIsCurrent()
        }
        throw ManipulatedRequestException()
    }

    tailrec private fun followToUser(link: ParentLinked): User {
        if (link is User) return link
        return followToUser(link.parent)
    }

    private fun ParentLinked.checkOwnerIsCurrent() {
        if (followToUser(this) != userService.getCurrentUser()) {
            throw ManipulatedRequestException()
        }
    }
}
