package outcobra.server.model.interfaces;

public interface ParentLink<Parent> {
    Long parentId();

    Class<Parent> getParentClass();

    static <T> ParentLink<T> make(Long parentId, Class<T> parentClass) {
        return new ParentLink<T>() {
            @Override
            public Long parentId() {
                return parentId;
            }

            @Override
            public Class<T> getParentClass() {
                return parentClass;
            }
        };
    }
}
