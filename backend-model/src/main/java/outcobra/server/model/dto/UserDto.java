package outcobra.server.model.dto;

import outcobra.server.model.User;
import outcobra.server.model.interfaces.*;

import static outcobra.server.model.interfaces.ParentLink.make;

public class UserDto implements Identifiable, ParentLinkedDto {
    private final Long id;
    private final String userId, username;

    public UserDto() {
        this.id = null;
        this.userId = this.username = null;
    }

    public UserDto(Long id, String userId, String username) {
        this.id = id;
        this.userId = userId;
        this.username = username;
    }

    public String getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public ParentLink getParentLink() {
        return make(id, User.class);
    }
}