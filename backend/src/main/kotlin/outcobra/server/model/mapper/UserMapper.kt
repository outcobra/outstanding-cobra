package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.interfaces.Mapper

/**
 * @author Joel Messerli
 * @since 1.0.0
 */
@Component
class UserMapper : Mapper<User, UserDto> {
    override fun fromDto(from: UserDto): User {
        val user = User(from.username, from.mail)
        user.id = from.id
        return user
    }

    override fun toDto(from: User): UserDto = UserDto(from.id, from.username)
}