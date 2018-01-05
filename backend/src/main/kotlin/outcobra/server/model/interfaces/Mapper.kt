package outcobra.server.model.interfaces

interface Mapper<EntityClass, DtoClass> {
    fun fromDto(from: DtoClass): EntityClass

    fun toDto(from: EntityClass): DtoClass
}

