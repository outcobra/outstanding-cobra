package outcobra.server.model.dto

import outcobra.server.annotation.NoArgConstructor
import outcobra.server.model.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

@NoArgConstructor
data class UserDto(val id: Long = 0, val auth0Id: String = "", val username: String = "") : OutcobraDto {

    override fun getIdentifier(): Long = id
    override fun getParentLink(): ParentLink = ParentLink.make(id, User::class.java)
}