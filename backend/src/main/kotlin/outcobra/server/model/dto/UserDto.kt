package outcobra.server.model.dto

import outcobra.server.model.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class UserDto(val userId: Long, val auth0Id: String, val username: String) : OutcobraDto {
    override fun getId(): Long = userId

    override fun getParentLink(): ParentLink = ParentLink.make(userId, User::class.java)
}