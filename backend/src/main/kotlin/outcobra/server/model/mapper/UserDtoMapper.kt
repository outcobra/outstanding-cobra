package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import java.util.*

@Component
class UserDtoMapper : Mapper<User, UserDto> {
    override fun fromDto(from: UserDto): User = User(from.userId, from.username, ArrayList())
    override fun toDto(from: User): UserDto = UserDto(from.auth0Id, from.username)
}