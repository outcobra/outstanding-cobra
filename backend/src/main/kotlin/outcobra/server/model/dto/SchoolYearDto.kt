package outcobra.server.model.dto

import outcobra.server.model.domain.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink
import java.time.LocalDate

data class SchoolYearDto(
        val id: Long = 0,
        val schoolClassIds: List<Long> = listOf(),
        val name: String = "",
        val validFrom: LocalDate = LocalDate.now(),
        val validTo: LocalDate = LocalDate.now(),
        val userId: Long = 0,
        val semesters: List<SemesterDto> = arrayListOf()) : OutcobraDto {

    override val identifier: Long
        get() = id

    override val parentLink: ParentLink
        get() = ParentLink.make(userId, User::class.java)
}