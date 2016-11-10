package outcobra.server.model.interfaces;

public interface Mappable<DtoType, EntityType> {
    Mapper<DtoType, EntityType> getMapper();
}