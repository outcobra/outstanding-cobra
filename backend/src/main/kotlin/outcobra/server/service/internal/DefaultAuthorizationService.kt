package outcobra.server.service.internal

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component
import outcobra.server.model.User
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.AuthorizationService
import outcobra.server.service.UserService
import outcobra.server.util.DtoLocator
import outcobra.server.util.RepositoryLocator
import javax.inject.Inject

@Component
class DefaultAuthorizationService
@Inject constructor(val userService: UserService,
                    val repositoryLocator: RepositoryLocator,
                    val dtoLocator: DtoLocator) : AuthorizationService {
    override fun getParentLinkedEntityOf(id: Long, entityName: String): ParentLinked {
        try {
            val repo = repositoryLocator.getForEntityName(entityName) as JpaRepository<ParentLinked, Long>
            return repo.findOne(id) ?: throw RuntimeException("Could not find entity for id $id")
        } catch (iae: IllegalArgumentException) {
            throw RuntimeException("Could not locate repository for $entityName")
        } catch(tce: TypeCastException) {
            throw RuntimeException("$entityName's repository is not ParentLinked!")
        }
    }

    override fun verifyDto(dtoString: String, entityName: String, new: Boolean): Boolean {
        val dtoClass = dtoLocator.getForEntityName(entityName)
        val parsedDto = ObjectMapper().readValue(dtoString, dtoClass)

        if (!new) {

        }
    }

    override fun verifyOwner(link: ParentLinked): Boolean {
        val entityOwner = followToUser(link)
        return entityOwner.auth0Id == userService.getTokenUserId()
    }

    tailrec private fun followToUser(link: ParentLinked): User {
        if (link is User) return link
        if (link != null) return followToUser(link.parent)
        else {
            throw RuntimeException()
        }
    }
}