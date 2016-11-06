package outcobra.server.service

import com.auth0.spring.security.api.Auth0UserDetails
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto

interface UserService {
    fun getCurrentUserDto(): UserDto

    fun getUserDetails(): Auth0UserDetails
    open fun getCurrentUser(): User
}