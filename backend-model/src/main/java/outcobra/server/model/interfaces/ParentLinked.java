package outcobra.server.model.interfaces;

public interface ParentLinked<Parent extends ParentLinked> {
    ParentLink<Parent> getParentLink();
}