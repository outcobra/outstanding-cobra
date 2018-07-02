package outcobra.server.model.dto

interface SchoolClassSemesterSubjectDto {
    val schoolClass: SchoolClassDto
    val subject: SubjectDto
    val semester: SemesterDto
}