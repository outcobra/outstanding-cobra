package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.exception.ManipulatedRequestException
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.UserService
import outcobra.server.util.RepositoryLocator
import outcobra.server.util.followToUser
import javax.inject.Inject

/**
 * This class allows it to authorize the requests within the mapper
 * @author Florian Bürgi
 * @since <since>
 */
@Component
open class BaseMapper {
    @Inject
    lateinit var repositoryLocator: RepositoryLocator
    @Inject
    lateinit var userService: UserService

    fun validateChildren(children: List<Long>, childType: Class<out ParentLinked>,
                         parentId: Long, parentType: Class<out ParentLinked>) {
        val childRepo = repositoryLocator.getForEntityClass(childType)
        val parentRepo = repositoryLocator.getForEntityClass(parentType)
        val parent = parentRepo.findOne(parentId)
        val areFromParent = children.map { childRepo.findOne(it) }.all { it.parent == parent }
        val userIsOwner = parent.followToUser() == userService.getCurrentUser()
        if (!(areFromParent && userIsOwner)) {
            throw ManipulatedRequestException()
        }
    }
}