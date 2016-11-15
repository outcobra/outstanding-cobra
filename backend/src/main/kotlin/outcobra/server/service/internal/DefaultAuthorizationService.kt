package outcobra.server.service.internal

import com.fasterxml.jackson.databind.ObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component
import outcobra.server.model.User
import outcobra.server.model.interfaces.Identifiable
import outcobra.server.model.interfaces.ParentLink
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.model.interfaces.ParentLinkedDto
import outcobra.server.service.AuthorizationService
import outcobra.server.service.UserService
import outcobra.server.util.DtoLocator
import outcobra.server.util.RepositoryLocator
import javax.inject.Inject
import javax.validation.ValidationException

@Component
class DefaultAuthorizationService
@Inject constructor(val userService: UserService,
                    val repositoryLocator: RepositoryLocator,
                    val dtoLocator: DtoLocator) : AuthorizationService {

    companion object {
        val LOGGER = LoggerFactory.getLogger(DefaultAuthorizationService::class.java)
        val objectMapper = ObjectMapper()
    }

    override fun getParentLinkedEntityOf(id: Long, entityName: String): ParentLinked {
        try {
            @Suppress("UNCHECKED_CAST")
            val repo = repositoryLocator.getForEntityName(entityName) as JpaRepository<ParentLinked, Long>
            return repo.findOne(id) ?: throw ValidationException("Could not find $entityName with id $id")
        } catch (iae: IllegalArgumentException) {
            throw ValidationException("Could not locate repository for $entityName")
        } catch(tce: TypeCastException) {
            throw ValidationException("$entityName does not implement ParentLinked!")
        }
    }

    override fun verifyDto(dtoString: String, entityName: String, new: Boolean): Boolean {
        val dtoClass = dtoLocator.getForEntityName(entityName)
        val parsedDto = objectMapper.readValue(dtoString, dtoClass)

        if (parsedDto !is Identifiable || parsedDto !is ParentLinkedDto) {
            LOGGER.warn("Dto must implement Identifiable and ParentLinkedDto")
            return false
        }

        if (!new) {
            // verify old owner
            try {
                @Suppress("UNCHECKED_CAST")
                val dtoRepo = repositoryLocator.getForEntityName(entityName) as JpaRepository<out ParentLinked, Long>
                val existing = dtoRepo.findOne(parsedDto.id)

                if (existing == null) {
                    LOGGER.warn("The entity you are trying to modify does not exist")
                    return false
                }

                if (!verifyOwner(existing)) {
                    LOGGER.warn("The entity you are trying to modify is owned by another user")
                    return false
                }
            } catch (tce: TypeCastException) {
                LOGGER.warn("Could not find repository for $entityName or $entityName does not implement ParentLinked", tce)
                return false
            }
        }

        // verify new owner
        return verifyOwner(parsedDto.parentLink)
    }

    override fun verifyOwner(linked: ParentLinked): Boolean {
        val entityOwner = followToUser(linked)
        return entityOwner.auth0Id == userService.getTokenUserId()
    }

    override fun verifyOwner(link: ParentLink): Boolean {
        val repo = repositoryLocator.getForEntityClass(link.parentClass)
        val entity = repo.findOne(link.id) ?: return false

        return verifyOwner(entity)
    }

    tailrec private fun followToUser(link: ParentLinked): User {
        if (link is User) return link
        return followToUser(link.parent)
    }
}