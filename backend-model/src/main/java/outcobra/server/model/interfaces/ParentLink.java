package outcobra.server.model.interfaces;

public interface ParentLink {
    Long getId();

    Class<? extends ParentLinked> getParentClass();

    static ParentLink make(Long parentId, Class<? extends ParentLinked> parentClass) {
        return new ParentLink() {
            @Override
            public Long getId() {
                return parentId;
            }

            @Override
            public Class<? extends ParentLinked> getParentClass() {
                return parentClass;
            }
        };
    }
}
