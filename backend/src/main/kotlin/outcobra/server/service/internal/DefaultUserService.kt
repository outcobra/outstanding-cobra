package outcobra.server.service.internal

import com.auth0.spring.security.api.Auth0UserDetails
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import outcobra.server.config.Auth0Client
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.mapper.Mapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import javax.inject.Inject
import javax.persistence.EntityNotFoundException

@Service
open class DefaultUserService
@Inject constructor(val userRepository: UserRepository,
                    val userDtoMapper: Mapper<User, UserDto>) : UserService {

    @Autowired
    private lateinit var auth0Client: Auth0Client

    override fun getUserDetails(): Auth0UserDetails {
        val auth = SecurityContextHolder.getContext().authentication
        return auth.principal as Auth0UserDetails
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

        val userDetails = getUserDetails()
        val newUser = User(userDetails.getAuth0Attribute("sub") as String, userDetails.username, null)
        userRepository.save(newUser)
    }
}