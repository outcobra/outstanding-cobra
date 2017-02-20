package outcobra.server.model.mapper

import outcobra.server.exception.ManipulatedRequestException
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.UserService
import outcobra.server.util.RepositoryLocator
import outcobra.server.util.followToUser
import javax.inject.Inject

/**
 * Created by dev on 20.02.17.
 */
class Mapper @Inject constructor(val userService: UserService,
                                 val repositoryLocator: RepositoryLocator) {
    fun validateChildern(children: List<Long>, childType: Class<ParentLinked>,
                         parentId: Long, parentType: Class<ParentLinked>) {
        val childRepo = repositoryLocator.getForEntityClass(childType)
        val parentRepo = repositoryLocator.getForEntityClass(parentType)
        val parent = parentRepo.findOne(parentId)
        val areFromParent = children.map { childRepo.findOne(it) }.all { it.parent.equals(parent) }
        val userIsOwner = parent.followToUser().equals(userService.getCurrentUser())
        if (!(areFromParent && userIsOwner)) {
            throw ManipulatedRequestException()
        }
    }
}