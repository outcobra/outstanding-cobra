package outcobra.server.model.dto

import outcobra.server.model.Institution
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class TeacherDto(val teacherId: Long, val institutionId: Long, val teacherName: String = "") : OutcobraDto {
    override fun getId(): Long = teacherId

    override fun getParentLink(): ParentLink = ParentLink.make(institutionId, Institution::class.java)
}