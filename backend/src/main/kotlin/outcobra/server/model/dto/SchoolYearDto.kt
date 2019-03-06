package outcobra.server.model.dto

import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.UserParentLinkedDto
import java.time.LocalDate

data class SchoolYearDto(
        val id: Long = 0,
        val schoolClassIds: List<Long> = listOf(),
        val name: String = "",
        val validFrom: LocalDate = LocalDate.now(),
        val validTo: LocalDate = LocalDate.now(),
        override var userId: Long = 0,
        val semesters: List<SemesterDto> = arrayListOf()) : UserParentLinkedDto, OutcobraDto {

    override val identifier: Long
        get() = id
}