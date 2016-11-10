package outcobra.server.model.dto;

import outcobra.server.model.User;
import outcobra.server.model.interfaces.MappableDto;
import outcobra.server.model.interfaces.Mapper;

public class UserDto implements MappableDto<UserDto, User> {
    private final String userId, username;

    public UserDto(String userId, String username) {
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
    public Mapper<UserDto, User> getMapper() {
        throw new UnsupportedOperationException("not implemented");
    }

    @Override
    public User toEntity() {
        throw new UnsupportedOperationException("not implemented");
    }
}