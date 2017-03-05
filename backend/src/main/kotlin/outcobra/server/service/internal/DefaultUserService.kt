package outcobra.server.service.internal

import com.auth0.authentication.result.UserProfile
import com.auth0.spring.security.api.Auth0JWTToken
import com.auth0.spring.security.api.Auth0UserDetails
import org.springframework.context.annotation.Profile
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import outcobra.server.annotation.DefaultImplementation
import outcobra.server.config.Auth0Client
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import javax.inject.Inject

@Service
@DefaultImplementation
@Profile("!$BASIC_AUTH_SECURITY_MOCK")
class DefaultUserService
@Inject constructor(val userRepository: UserRepository,
                    val userDtoMapper: Mapper<User, UserDto>,
                    val auth0Client: Auth0Client) : UserService {

    override fun readUserById(id: Long): User {
        return userRepository.getOne(id)
    }

    override fun getTokenUserId(): String {
        val userDetails = SecurityContextHolder.getContext().authentication.principal as Auth0UserDetails
        return userDetails.getAuth0Attribute("sub") as String
    }

    override fun getCurrentUser(): User? {
        val auth0Id = getTokenUserId()
        return userRepository.findOne(QUser.user.auth0Id.eq(auth0Id))
    }

    override fun getCurrentUserDto(): UserDto? {
        return userDtoMapper.toDto(getCurrentUser())
    }

    override fun getUserProfile(): UserProfile {
        val auth = SecurityContextHolder.getContext().authentication
        return auth0Client.getUserProfile(auth as Auth0JWTToken)
    }

    override fun loginRegister(): UserDto {
        val user = getCurrentUser()
        if (user != null) return userDtoMapper.toDto(user)

        val userDetails = getUserProfile()
        val newUser = User(userDetails.id, userDetails.nickname, null)
        return userDtoMapper.toDto(userRepository.save(newUser))
    }
}