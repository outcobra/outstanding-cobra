package outcobra.server.service.internal

import com.auth0.spring.security.api.Auth0UserDetails
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.mapper.Mapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import javax.inject.Inject
import javax.persistence.EntityNotFoundException

@Component
open class DefaultUserService
@Inject constructor(val userRepository: UserRepository,
                    val userDtoMapper: Mapper<User, UserDto>) : UserService {

    override fun getCurrentUser(): UserDto {
        val userDetails = getUserDetails()
        try {
            val user = userRepository.getOne(userDetails.getAuth0Attribute("sub") as String)
            return userDtoMapper.toDto(user)
        } catch (e: EntityNotFoundException) {
            return UserDto("", "")
        }
    }

    override fun getUserDetails(): Auth0UserDetails {
        val auth = SecurityContextHolder.getContext().authentication
        return auth.principal as Auth0UserDetails
    }

    override fun loginRegister() {
        if (getCurrentUser().userId.isNotEmpty()) return

        val userDetails = getUserDetails()
        val newUser = User(userDetails.getAuth0Attribute("sub") as String, userDetails.username, null)
        userRepository.save(newUser)
    }
}