package outcobra.server.model.dto

import outcobra.server.model.Institution
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink


data class SchoolClassDto(val schoolClassId: Long = 0, val institutionId: Long = 0, val normalizedName: String = "", val schoolYears: List<SchoolYearDto> = arrayListOf()) : OutcobraDto {
    override fun getId(): Long = schoolClassId

    override fun getParentLink(): ParentLink = ParentLink.make(institutionId, Institution::class.java)
}