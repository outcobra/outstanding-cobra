package outcobra.server.model.dto.manage

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
        val schoolYears: List<SchoolYearDto>
)

data class SchoolYearDto(
        val id: Long,
        val name: String,
        val validFrom: LocalDate,
        val validTo: LocalDate,
        val semesters: List<SemesterDto>
)

data class SemesterDto(
        val id: Long,
        val name: String,
        val validFrom: LocalDate,
        val validTo: LocalDate,
        val subjects: List<SubjectDto>
)

data class SubjectDto(
        val id: Long,
        val name: String
)
