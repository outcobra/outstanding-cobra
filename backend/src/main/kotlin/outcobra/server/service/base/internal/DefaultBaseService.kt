package outcobra.server.service.base.internal

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QueryDslPredicateExecutor
import outcobra.server.model.interfaces.Mapper
import outcobra.server.service.base.BaseService
import javax.transaction.Transactional

/**
 * Default implementation of a basic service to save, read and delete an entity
 * @see BaseService
 * @author Florian Bürgi
 * @since <since>
 */
@Transactional
open class DefaultBaseService<Entity, Dto, out Repo>(val mapper: Mapper<Entity, Dto>,
                                                     val repository: Repo, val requestValidator: RequestValidator<Dto>, val type: KClass<Entity>) : BaseService<Dto>
where Repo : JpaRepository<Entity, Long>, Repo : QueryDslPredicateExecutor<Entity>, Dto : OutcobraDto, Entity : ParentLinked {

    override fun save(dto: Dto): Dto {
        requestValidator.validateDtoSaving(dto)
        val entity = repository.save(mapper.fromDto(dto))
        return mapper.toDto(entity)
    }

    override fun readById(id: Long): Dto {
        requestValidator.validateRequestById(id, type)
        return mapper.toDto(repository.findOne(id))
    }

    override fun delete(id: Long) {
        requestValidator.validateRequestById(id, type)
        repository.delete(id)
    }
}