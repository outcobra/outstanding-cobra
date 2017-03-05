package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.annotation.Open
import outcobra.server.exception.ManipulatedRequestException
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.UserService
import outcobra.server.util.RepositoryLocator
import outcobra.server.util.followToUser
import javax.inject.Inject
import kotlin.reflect.KClass

/**
 * This class allows authorizing the requests within the mapper
 * @author Florian Bürgi
 * @since <since>
 */
@Component
@Open
class BaseMapper {
    @Inject
    lateinit var repositoryLocator: RepositoryLocator
    @Inject
    lateinit var userService: UserService

    fun validateChildren(children: List<Long>, childType: KClass<out ParentLinked>,
                         parentId: Long, parentType: KClass<out ParentLinked>) {
        val childRepo = repositoryLocator.getForEntityClass(childType.java)
        val parentRepo = repositoryLocator.getForEntityClass(parentType.java)
        val parent = parentRepo.findOne(parentId)
        val areFromParent = childRepo.findAll(children).all { it.parent == parent }
        val userIsOwner = parent.followToUser() == userService.getCurrentUser()
        if (!(areFromParent && userIsOwner)) {
            throw ManipulatedRequestException()
        }
    }
}