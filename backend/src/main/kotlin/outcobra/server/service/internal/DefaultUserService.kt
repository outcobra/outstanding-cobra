package outcobra.server.service.internal

import com.auth0.authentication.result.UserProfile
import com.auth0.spring.security.api.Auth0JWTToken
import com.auth0.spring.security.api.Auth0UserDetails
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import outcobra.server.config.Auth0Client
import outcobra.server.config.Auth0Client
import outcobra.server.model.QUser
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.mapper.Mapper
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

    @Autowired
    private lateinit var auth0Client: Auth0Client
    override fun getCurrentUser(): UserDto {
        val auth0Id = getTokenUserId()
        val user = userRepository.findOne(QUser.user.auth0Id.eq(auth0Id)) ?: return UserDto("", "")
        return userDtoMapper.toDto(user)
    }

    override fun getUserProfile(): UserProfile {
        val auth = SecurityContextHolder.getContext().authentication
        return auth0Client.getUserProfile(auth as Auth0JWTToken)
    }

    override fun getCurrentUserDto(): UserDto {
        return userDtoMapper toDto getCurrentUser()
    }

    override fun getCurrentUser(): User {
        val userDetails = getUserDetails()
        try {
            return userRepository.getOne(userDetails.getAuth0Attribute("user_id") as String)
        } catch (e: EntityNotFoundException) {
            return User() // TODO what should we return here
        }
    }


    override fun loginRegister() {
        if (getCurrentUserDto().userId.isNotEmpty()) return

        val userDetails = getUserProfile()
        val newUser = User(userDetails.id, userDetails.nickname, null)
        userRepository.save(newUser)
    }
}