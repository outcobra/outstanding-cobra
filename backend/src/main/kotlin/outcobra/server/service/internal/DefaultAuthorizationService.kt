package outcobra.server.service.internal

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component
import outcobra.server.model.User
import outcobra.server.model.interfaces.ParentLink
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.AuthorizationService
import outcobra.server.service.UserService
import outcobra.server.util.RepositoryLocator
import javax.inject.Inject

@Component
class DefaultAuthorizationService
@Inject constructor(val userService: UserService,
                    val repositoryLocator: RepositoryLocator) : AuthorizationService {

    override fun parentLinkOf(id: Long, entityName: String): ParentLink<*> {
        try {
            val repo = repositoryLocator.getForEntityName(entityName) as JpaRepository<ParentLinked<*>, Long>
            val parentLinked = repo.findOne(id)

            if (parentLinked != null) {
                return parentLinked.parentLink
            } else {
                throw RuntimeException("Could not find entity for id $id")
            }
        } catch (iae: IllegalArgumentException) {
            throw RuntimeException("Could not locate repository for $entityName")
        } catch(tce: TypeCastException) {
            throw RuntimeException("$entityName's repository is not ParentLinked!")
        }
    }

    override fun <T> verifyOwner(link: ParentLink<T>): Boolean {
        val entityOwner = followToUser(link)
        return entityOwner.auth0Id == userService.getTokenUserId()
    }

    tailrec private fun followToUser(link: ParentLink<*>): User {
        val repo = repositoryLocator.getForEntityClass(link.parentClass)
        val parent = repo.findOne(link.parentId()) as? ParentLinked<*>

        if (parent is User) {
            return parent
        }
        if (parent == null) {
            throw RuntimeException("parent is null")
        }

        val nextLink = parent.parentLink
        if (nextLink is ParentLink<*>) {
            return followToUser(nextLink)
        } else {
            throw RuntimeException("$parent.parentLink is not a ParentLink<*>")
        }
    }
}

class NoParentFoundException(override val message: String) : Exception(message)