package outcobra.server.model

import outcobra.server.model.Mappable

interface MappableEntity<DtoType, EntityType> : Mappable<DtoType, EntityType> {
    fun toDto(): DtoType
}