package outcobra.server.model.dto


import outcobra.server.model.Institution
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink


data class TeacherDto(val id: Long,
                      val institutionId: Long,
                      val name: String = "",
                      val teacherEmail: String = "") : OutcobraDto {

    override fun getIdentifier(): Long = id

    override fun getParentLink(): ParentLink = ParentLink.make(institutionId, Institution::class.java)
}