package outcobra.server.model.dto

import outcobra.server.model.SchoolYear
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class SemesterDto(val semesterId: Long, val schoolYearId: Long) : OutcobraDto {
    override fun getId(): Long = semesterId

    override fun getParentLink(): ParentLink = ParentLink.make(schoolYearId, SchoolYear::class.java)
}