package outcobra.server.service.internal

import org.springframework.context.annotation.Profile
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import outcobra.server.annotation.DefaultImplementation
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import outcobra.server.web.auth.model.JwtAuthenticationToken
import outcobra.server.web.auth.model.OutcobraUser
import javax.inject.Inject

@Service
@DefaultImplementation
@Profile("!$BASIC_AUTH_SECURITY_MOCK")
class DefaultUserService
@Inject constructor(val userRepository: UserRepository,
                    val userDtoMapper: Mapper<User, UserDto>) : UserService {
    override fun getCurrentOutcobraUser(): OutcobraUser {
        return (SecurityContextHolder.getContext().authentication as JwtAuthenticationToken).principal!!
    }

    override fun getCurrentUser(): User {
        return userRepository.findByMail(getCurrentOutcobraUser().mail)!!
    }

    override fun getCurrentUserDto(): UserDto {
        return userDtoMapper.toDto(getCurrentUser())
    }

    override fun readUserById(id: Long): User {
        return userRepository.findOne(id)
    }

    override fun checkEmailNotTaken(mail: String): Boolean {
        return userRepository.findByMail(mail) == null
    }
}