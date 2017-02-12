package outcobra.server.service

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QueryDslPredicateExecutor
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.base.BaseService
import kotlin.reflect.KClass

/**
 * A service to validate all requests on a very basic level
 * meant to be used inside the BaseService
 * @see BaseService
 * @author Florian Büri
 * @since <since>
 */
interface RequestAuthorizationService<Entity, Dto, out Repo>
where Repo : JpaRepository<Entity, Long>, Repo : QueryDslPredicateExecutor<Entity>, Dto : OutcobraDto, Entity : ParentLinked {

    /**
     * This function validates the creation and the update of every [OutcobraDto]
     * @param dto the [OutcobraDto] you want to validate before saving
     * @return a [Boolean] indicating if the operation is valid or not
     */
    fun validateDtoSaving(dto: Dto)

    /**
     * This function validates the read/delete request of every [ParentLinked]-Entity
     * @param id the Identifier of the object that is requested
     * @return a [Boolean] indicating if the operation is valid or not
     */
    fun validateRequestById(id: Long)

    /**
     * This function validates the read request of every [ParentLinked]-Entity
     * @param parentId the Identifier of the parent-object that is requested
     * @param parentType the [KClass] of the parent entity
     * @return a [Boolean] indicating if the operation is valid or not
     */
    fun validateByParentId(parentId: Long, parentType: KClass<*>)
}