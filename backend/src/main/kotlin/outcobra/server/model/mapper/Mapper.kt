package outcobra.server.model.mapper

interface Mapper<EntityClass, DtoClass> {
    infix fun toDto(from: EntityClass): DtoClass
    infix fun fromDto(from: DtoClass): EntityClass
}