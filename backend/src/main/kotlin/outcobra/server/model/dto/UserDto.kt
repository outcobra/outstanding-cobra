package outcobra.server.model.dto

import outcobra.server.model.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class UserDto(val id: Long = 0, val username: String = "", val mail: String = "") : OutcobraDto {
    override fun getIdentifier(): Long = id
    override fun getParentLink(): ParentLink = ParentLink.make(id, User::class.java)
}