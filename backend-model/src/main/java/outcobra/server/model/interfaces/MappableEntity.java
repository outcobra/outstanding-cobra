package outcobra.server.model.interfaces;

public interface MappableEntity<DtoType, EntityType> extends Mappable<DtoType, EntityType> {
    DtoType toDto();
}

