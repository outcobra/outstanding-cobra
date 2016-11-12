package outcobra.server.model.interfaces;

public interface Mappable<EntityType, DtoType> {
    Mapper<EntityType, DtoType> getMapper();
}