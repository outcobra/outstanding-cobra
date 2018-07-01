package outcobra.server.model.dto.manage

import outcobra.server.model.dto.SemesterDto
import java.time.LocalDate

data class SchoolYearDto(
        val id: Long,
        val name: String,
        val validFrom: LocalDate,
        val validTo: LocalDate,
        val schoolClassIds: List<Long>,
        val semesters: List<SemesterDto>
)