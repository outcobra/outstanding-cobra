package outcobra.server.service

import com.auth0.spring.security.api.Auth0UserDetails
import outcobra.server.model.dto.UserDto

interface UserService {
    /**
     * Returns the currently logged-in user from the database
     */
    fun getCurrentUser(): UserDto

    /**
     * Gets the user's Auth0UserDetails
     */
    fun getUserDetails(): Auth0UserDetails

    /**
     * Saves the user to the database if it's his first time using the application
     */
    fun loginRegister(): Unit
}