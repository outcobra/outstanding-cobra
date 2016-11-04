package outcobra.server.model

import outcobra.server.model.mapper.Mapper

interface Mappable<DtoType, EntityType> {
    fun getMapper(): Mapper<DtoType, EntityType>
}