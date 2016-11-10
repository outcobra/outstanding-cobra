package outcobra.server.service.internal

import com.auth0.authentication.result.UserProfile
import com.auth0.spring.security.api.Auth0JWTToken
import com.auth0.spring.security.api.Auth0UserDetails
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import outcobra.server.config.Auth0Client
import outcobra.server.model.QUser
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import javax.inject.Inject

@Component
open class DefaultUserService
@Inject constructor(val userRepository: UserRepository,
                    val userDtoMapper: Mapper<User, UserDto>,
                    val auth0Client: Auth0Client) : UserService {

    override fun getTokenUserId(): String {
        val userDetails = SecurityContextHolder.getContext().authentication.principal as Auth0UserDetails
        return userDetails.getAuth0Attribute("sub") as String
    }

    override fun getCurrentUser(): UserDto {
        val auth0Id = getTokenUserId()
        val user = userRepository.findOne(QUser.user.auth0Id.eq(auth0Id)) ?: return UserDto("", "")
        return userDtoMapper.toDto(user)
    }

    override fun getUserProfile(): UserProfile {
        val auth = SecurityContextHolder.getContext().authentication
        return auth0Client.getUserProfile(auth as Auth0JWTToken)
    }

    override fun loginRegister() {
        if (getCurrentUser().userId.isNotEmpty()) return

        val userDetails = getUserProfile()
        val newUser = User(userDetails.id, userDetails.nickname, null)
        userRepository.save(newUser)
    }
}