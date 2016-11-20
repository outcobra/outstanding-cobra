package outcobra.server.model.dto

import outcobra.server.model.SchoolClass
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class SchoolYearDto(val schoolYearId: Long, val schoolClassId: Long) : OutcobraDto {
    override fun getId(): Long = schoolYearId

    override fun getParentLink(): ParentLink = ParentLink.make(schoolClassId, SchoolClass::class.java)
}