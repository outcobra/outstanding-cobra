package outcobra.server.model.dto.manage.old

import outcobra.server.model.dto.ColorDto
import java.time.LocalDate

data class ManageDto(
        val institutions: List<InstitutionDto>
)

data class InstitutionDto(
        val id: Long,
        val name: String,
        val schoolClasses: List<SchoolClassDto>
)

data class SchoolClassDto(
        val id: Long,
        val normalizedName: String,
        val institutionId: Long,
        val schoolYears: List<SchoolYearDto>
)

data class SchoolYearDto(
        val id: Long,
        val name: String,
        val validFrom: LocalDate,
        val validTo: LocalDate,
        val schoolClassId: Long,
        val semesters: List<SemesterDto>
)

data class SemesterDto(
        val id: Long,
        val name: String,
        val validFrom: LocalDate,
        val validTo: LocalDate,
        val schoolYearId: Long,
        val subjects: List<SubjectDto>
)

data class SubjectDto(
        val id: Long,
        val name: String,
        val color: ColorDto,
        val semesterId: Long
)
