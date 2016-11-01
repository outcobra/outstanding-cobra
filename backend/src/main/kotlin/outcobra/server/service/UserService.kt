package outcobra.server.service

import com.auth0.spring.security.api.Auth0UserDetails
import outcobra.server.model.dto.UserDto

interface UserService {
    fun getCurrentUser(): UserDto

    fun getUserDetails(): Auth0UserDetails
}