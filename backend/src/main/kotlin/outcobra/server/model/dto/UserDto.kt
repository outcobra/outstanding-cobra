package outcobra.server.model.dto

import outcobra.server.model.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class UserDto(val id: Long = 0, val username: String = "", val mail: String = "") : OutcobraDto {
    override val identifier: Long
        get() = id

    override val parentLink: ParentLink
        get() = ParentLink.make(id, User::class.java)
}