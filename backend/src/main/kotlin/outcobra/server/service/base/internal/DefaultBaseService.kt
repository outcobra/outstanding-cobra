package outcobra.server.service.base.internal

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor
import outcobra.server.annotation.AllOpen
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.base.BaseService
import outcobra.server.validator.RequestValidator
import javax.transaction.Transactional
import kotlin.reflect.KClass

/**
 * Default implementation of a basic service to save, read and delete an entity
 * @see BaseService
 * @author Florian Bürgi
 * @since 1.1.0
 */
@Transactional
@AllOpen
open class DefaultBaseService<Entity, Dto, out Repo>(val mapper: Mapper<Entity, Dto>,
                                                val repository: Repo,
                                                val requestValidator: RequestValidator<Dto>,
                                                val type: KClass<Entity>) : BaseService<Dto>
where Repo : JpaRepository<Entity, Long>, Repo : QuerydslPredicateExecutor<Entity>, Dto : OutcobraDto, Entity : ParentLinked {

    override fun save(dto: Dto): Dto {
        repository.flush()
        requestValidator.validateRequestByDto(dto)
        var entity = mapper.fromDto(dto)
        entity = repository.saveAndFlush(entity)
        return mapper.toDto(entity)
    }

    override fun readById(id: Long): Dto {
        repository.flush()
        requestValidator.validateRequestById(id, type)
        val entity = repository.getOne(id)
        return mapper.toDto(entity)
    }

    override fun delete(id: Long) {
        requestValidator.validateRequestById(id, type)
        repository.deleteById(id)
    }
}
