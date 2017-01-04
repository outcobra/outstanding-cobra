package outcobra.server.model.dto

/**
 * @author Mario Kunz
 */
data class TaskFilterDto(
    val institutions: List<InstitutionDto> = emptyList(),
    val schoolClasses: List<SchoolClassDto> = emptyList(),
    val schoolYears: List<SchoolYearDto> = emptyList(),
    val semesters: List<SemesterDto> = emptyList(),
    val subjects: List<SubjectDto> = emptyList()
)