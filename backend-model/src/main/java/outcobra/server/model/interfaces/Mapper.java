package outcobra.server.model.interfaces;

public interface Mapper<EntityClass, DtoClass> {
    EntityClass fromDto(DtoClass from);

    DtoClass toDto(EntityClass from);
}

