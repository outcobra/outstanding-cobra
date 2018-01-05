package outcobra.server.model.dto

import outcobra.server.model.Semester
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class SubjectDto(val id: Long = 0,
                      val semesterId: Long = 0,
                      val name: String = "",
                      val color: ColorDto = ColorDto(),
                      val teacherId: Long? = 0) : OutcobraDto {

    override val identifier: Long get() = id
    override val parentLink: ParentLink
        get() = ParentLink.make(semesterId, Semester::class.java)
}
