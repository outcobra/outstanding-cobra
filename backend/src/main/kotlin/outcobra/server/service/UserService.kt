package outcobra.server.service

import outcobra.server.model.Identity
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.web.auth.model.OutcobraUser

/**
 * This interface defines all functions for a user service.
 * This service is used for all user related operations like
 * login or registration
 *
 * @author Joel Messerli
 * @since 1.0.0
 */
interface UserService {
    fun getCurrentOutcobraUser(): OutcobraUser

    fun getCurrentUser(): User

    fun getCurrentUserDto(): UserDto

    fun findIdentitiesByIdentifierAndType(identifier: String, identityType: String): List<Identity>

    fun readUserById(id: Long): User

    fun checkEmailNotTaken(mail: String): Boolean
}