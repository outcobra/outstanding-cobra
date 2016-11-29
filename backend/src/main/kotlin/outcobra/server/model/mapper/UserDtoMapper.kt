package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.interfaces.Mapper

@Component
open class UserDtoMapper : Mapper<User, UserDto> {
    override fun fromDto(from: UserDto): User = User(from.identifier, from.auth0Id, from.username)
    override fun toDto(from: User): UserDto = UserDto(from.id, from.auth0Id, from.username)
}