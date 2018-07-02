package outcobra.server.model.dto

import outcobra.server.model.domain.SchoolYear
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink
import java.time.LocalDate

data class SemesterDto(
        val id: Long = 0,
        val schoolYearId: Long = 0,
        val name: String = "",
        val validFrom: LocalDate = LocalDate.now(),
        val validTo: LocalDate = LocalDate.now(),
        val markReportIds: List<Long> = arrayListOf(),
        val timetableId: Long = 0,
        val schoolClassSubjectDto: List<SemesterDto.SchoolClassSubjectDto> = listOf()) : OutcobraDto {

    override val identifier: Long get() = id
    override val parentLink: ParentLink
        get() = ParentLink.make(schoolYearId, SchoolYear::class.java)

    data class SchoolClassSubjectDto(val schoolClassId: Long,
                                     val subjectIds: List<Long>)
}