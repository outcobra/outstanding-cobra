package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.exception.ValidationKey
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.UserService
import outcobra.server.util.RepositoryLocator
import outcobra.server.util.followToUser
import javax.inject.Inject
import kotlin.reflect.KClass

/**
 * This class allows authorizing the requests within the mapper
 * @author Florian Bürgi
 * @since 1.1.0
 */
@Component
class BaseMapper {
    @Inject
    lateinit var repositoryLocator: RepositoryLocator
    @Inject
    lateinit var userService: UserService

    fun validateChildren(children: List<Long>, childType: KClass<out ParentLinked>,
                         parentId: Long, parentType: KClass<out ParentLinked>) {
        val existingChildren = children.filter { it != 0L }
        if (parentId == 0L && existingChildren.isEmpty()) {
            return //this parent object and all of its children are new
        }
        val childRepo = repositoryLocator.getForEntityClass(childType.java)
        val parentRepo = repositoryLocator.getForEntityClass(parentType.java)
        val parent = parentRepo.getOne(parentId) ?: ValidationKey.ENTITY_NOT_FOUND.throwException()
        val areFromParent = childRepo.findAllById(existingChildren).all { it.parent?.id == parent.id }
        val userIsOwner = parent.followToUser().id == userService.getCurrentUser().id
        if (!(areFromParent && userIsOwner)) {
            ValidationKey.FORBIDDEN.throwException()
        }
    }
}
