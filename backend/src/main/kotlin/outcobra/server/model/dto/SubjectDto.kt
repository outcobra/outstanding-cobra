package outcobra.server.model.dto

import outcobra.server.model.domain.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class SubjectDto(val id: Long = 0,
                      val schoolClassSemesterDto: List<SchoolClassSemesterDto> = listOf(),
                      val name: String = "",
                      val color: ColorDto = ColorDto(),
                      val userId: Long = 0,
                      val teacherId: Long? = 0) : OutcobraDto {

    override val identifier: Long get() = id
    override val parentLink: ParentLink
        get() = ParentLink.make(userId, User::class.java)
}
