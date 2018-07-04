package outcobra.server.model.dto


import outcobra.server.model.domain.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class TeacherDto(val id: Long = 0,
                      val userId: Long = 0,
                      val name: String = "",
                      val email: String = "") : OutcobraDto {

    override val identifier: Long get() = id
    override val parentLink: ParentLink
        get() = ParentLink.make(userId, User::class.java)
}