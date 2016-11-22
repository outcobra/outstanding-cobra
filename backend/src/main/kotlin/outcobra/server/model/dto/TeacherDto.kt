package outcobra.server.model.dto

import outcobra.server.model.Institution
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class TeacherDto(
        val teacherId: Long = 0,
        val institutionId: Long = 0,
        val name: String,
        val email: String? = null) : OutcobraDto {

    override fun getId(): Long = teacherId

    override fun getParentLink(): ParentLink = ParentLink.make(institutionId, Institution::class.java)
}