package outcobra.server.model.interfaces;

public interface MappableDto<DtoType, EntityType> extends Mappable<DtoType, EntityType> {
    EntityType toEntity();
}

