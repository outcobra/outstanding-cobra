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
open class DefaultBaseService<Entity, Dto, out Repo>
constructor(val dtoMapper: Mapper<Entity, Dto>,
            val jpaRepository: Repo) : BaseService<Dto>
where Repo : JpaRepository<Entity, Long>, Repo : QueryDslPredicateExecutor<Entity> {

    override fun save(dto: Dto): Dto {
        val entity = jpaRepository.save(dtoMapper.fromDto(dto))
        return dtoMapper.toDto(entity)
    }

    override fun readById(id: Long): Dto {
        return dtoMapper.toDto(jpaRepository.findOne(id))
    }

    override fun delete(id: Long) {
        jpaRepository.delete(id)
    }
}