package outcobra.server.model.dto

import outcobra.server.model.Institution
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class SchoolClassDto(val schoolClassId: Long, val institutionId: Long) : OutcobraDto {
    override fun getId(): Long = schoolClassId

    override fun getParentLink(): ParentLink = ParentLink.make(institutionId, Institution::class.java)
}