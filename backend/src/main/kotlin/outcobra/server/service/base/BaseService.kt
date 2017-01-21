package outcobra.server.service.base

/**
 * basic service interface
 */
interface BaseService<Dto> {
    fun save(dto: Dto): Dto
    fun readById(id: Long): Dto
    fun delete(id: Long)
}