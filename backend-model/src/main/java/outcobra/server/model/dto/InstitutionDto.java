package outcobra.server.model.dto;

import outcobra.server.model.User;
import outcobra.server.model.interfaces.*;

public class InstitutionDto implements Identifiable, ParentLinkedDto {
    private final Long id;
    private final String name;
    private final Long userId;

    public InstitutionDto() {
        this.id = this.userId = null;
        this.name = null;
    }

    public InstitutionDto(Long id, String name, Long userId) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }

    @Override
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Long getUserId() {
        return userId;
    }

    @Override
    public ParentLink getParentLink() {
        return ParentLink.make(userId, User.class);
    }
}
