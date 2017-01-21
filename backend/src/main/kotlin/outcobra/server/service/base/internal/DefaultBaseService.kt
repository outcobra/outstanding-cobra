package outcobra.server.service.base.internal

import org.springframework.data.jpa.repository.JpaRepository
import outcobra.server.model.interfaces.Mapper
import outcobra.server.service.base.BaseService
import javax.transaction.Transactional

/**
 * Default implementation of a basic service to save, read and delete an entity
 */
@Transactional
open class DefaultBaseService<Entity, Dto>
constructor(val dtoMapper: Mapper<Entity, Dto>,
            val jpaRepository: JpaRepository<Entity, Long>) : BaseService<Dto> {

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