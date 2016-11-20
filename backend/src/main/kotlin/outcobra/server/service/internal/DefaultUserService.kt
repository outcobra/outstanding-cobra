package outcobra.server.service.internal

import com.auth0.authentication.result.UserProfile
import com.auth0.spring.security.api.Auth0JWTToken
import com.auth0.spring.security.api.Auth0UserDetails
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import outcobra.server.config.Auth0Client
import outcobra.server.model.QUser
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import javax.inject.Inject

@Service
open class DefaultUserService
@Inject constructor(val userRepository: UserRepository,
                    val userDtoMapper: Mapper<User, UserDto>,
                    val auth0Client: Auth0Client) : UserService {

    override fun getTokenUserId(): String {
        val userDetails = SecurityContextHolder.getContext().authentication.principal as Auth0UserDetails
        return userDetails.getAuth0Attribute("sub") as String
    }

    override fun getCurrentUser(): User {
        val auth0Id = getTokenUserId()
        return userRepository.findOne(QUser.user.auth0Id.eq(auth0Id)) ?: return User()
    }

    override fun getCurrentUserDto(): UserDto {
        return userDtoMapper.toDto(getCurrentUser())
    }

    override fun getUserProfile(): UserProfile {
        val auth = SecurityContextHolder.getContext().authentication
        return auth0Client.getUserProfile(auth as Auth0JWTToken)
    }

    override fun loginRegister() {
        if (getCurrentUserDto().userId > 0) return

        val userDetails = getUserProfile()
        val newUser = User(userDetails.id, userDetails.nickname, null)
        userRepository.save(newUser)
    }
}