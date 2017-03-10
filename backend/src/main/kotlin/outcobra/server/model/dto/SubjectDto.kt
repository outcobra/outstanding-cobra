package outcobra.server.model.dto

import outcobra.server.model.Semester
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class SubjectDto(val id: Long = 0,
                      val semesterId: Long = 0,
                      val name: String = "",
                      val color: ColorDto = ColorDto(),
                      val teacherId: Long? = 0) : OutcobraDto {

    constructor() : this(id = 0)

    override fun getIdentifier(): Long = id
    override fun getParentLink(): ParentLink = ParentLink.make(semesterId, Semester::class.java)
}
