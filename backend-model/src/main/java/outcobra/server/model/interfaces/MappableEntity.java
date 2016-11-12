package outcobra.server.model.interfaces;

public interface MappableEntity<EntityType, DtoType> extends Mappable<EntityType, DtoType> {
    DtoType toDto();
}

