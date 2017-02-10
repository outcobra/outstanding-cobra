package outcobra.server.service

import com.auth0.authentication.result.UserProfile
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto

/**
 * This interface defines all functions for a user service.
 * This service is used for all user related operations like
 * login or registration
 *
 * @author Joel Messerli
 * @since 1.0.0
 */
interface UserService {
    /**
     * Returns the currently logged-in user from the database
     */
    fun getCurrentUserDto(): UserDto?

    /**
     * Returns the user's id by reading the JWT Token. This is faster than #getUserProfile because it does not call the Auth0 API
     */
    fun getTokenUserId(): String

    /**
     * Gets the user's UserProfile
     */
    fun getUserProfile(): UserProfile

    /**
     * Saves the user to the database if it's his first time using the application
     */
    fun loginRegister(): UserDto

    /**
     * Reads the currently logged in user from the database
     */
    fun getCurrentUser(): User?

    /**
     * This function reads a user based on its identifier
     */
    fun readUserById(id: Long): User

}