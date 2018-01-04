package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.interfaces.Mapper

/**
 * @author Joel Messerli
 * @since 1.0.0
 */
@Component
class UserMapper : Mapper<User, UserDto> {
    override fun fromDto(from: UserDto): User = User(from.id, from.username, from.mail)
    override fun toDto(from: User): UserDto = UserDto(from.id ?: 0, from.username)
}