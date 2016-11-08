package outcobra.server.model

interface MappableEntity<DtoType, EntityType> : Mappable<DtoType, EntityType> {
    fun toDto(): DtoType
}