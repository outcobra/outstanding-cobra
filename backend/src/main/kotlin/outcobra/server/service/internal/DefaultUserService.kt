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
import outcobra.server.exception.InvalidUserDetailException
import outcobra.server.exception.ValidationException
import outcobra.server.exception.ValidationKey
import outcobra.server.model.QUser
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
        val authenticationPrincipal = SecurityContextHolder.getContext().authentication.principal
        if (authenticationPrincipal is Auth0UserDetails) {
            return authenticationPrincipal.getAuth0Attribute("sub") as String
        }
        throw InvalidUserDetailException("authentication principal: ${authenticationPrincipal} cannot be cast to ${Auth0UserDetails::class.qualifiedName}")
    }

    override fun getCurrentUser() = userRepository.findOne(QUser.user.auth0Id.eq(getTokenUserId()))
            ?: ValidationKey.USER_NOT_IN_DATABASE_RELOGIN.throwException()

    override fun getCurrentUserDto() = userDtoMapper.toDto(getCurrentUser())!!

    override fun getUserProfile(): UserProfile {
        val auth = SecurityContextHolder.getContext().authentication
        return auth0Client.getUserProfile(auth as Auth0JWTToken)
    }

    override fun loginRegister(): UserDto {
        return try {
            userDtoMapper.toDto(getCurrentUser())
        } catch (vex: ValidationException) {
            val userDetails = getUserProfile()
            val newUser = User(userDetails.id, userDetails.nickname, null)
            userDtoMapper.toDto(userRepository.save(newUser))
        }
    }
}