package outcobra.server.model.dto

import outcobra.server.model.SchoolYear
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink
import java.time.LocalDate

data class SemesterDto(
        val id: Long,
        val schoolYearId: Long = 0,
        val name: String = "",
        val validFrom: LocalDate,
        val validTo: LocalDate,
        val subjects: List<SubjectDto> = arrayListOf(),
        val markReportIds: List<Long> = arrayListOf(),
        val timetableId: Long = 0) : OutcobraDto {
    override fun getIdentifier(): Long = id

    override fun getParentLink(): ParentLink = ParentLink.make(schoolYearId, SchoolYear::class.java)
}