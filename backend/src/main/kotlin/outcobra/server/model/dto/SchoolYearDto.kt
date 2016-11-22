package outcobra.server.model.dto

import outcobra.server.model.SchoolClass
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink
import java.time.LocalDate

data class SchoolYearDto(
        val schoolYearId: Long = 0,
        val schoolClassId: Long = 0,
        val name: String,
        val validFrom: LocalDate,
        val validTo: LocalDate) : OutcobraDto {
    override fun getId(): Long = schoolYearId

    override fun getParentLink(): ParentLink = ParentLink.make(schoolClassId, SchoolClass::class.java)
}