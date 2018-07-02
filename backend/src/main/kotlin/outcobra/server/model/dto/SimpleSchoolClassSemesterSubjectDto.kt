package outcobra.server.model.dto

data class SimpleSchoolClassSemesterSubjectDto(override val schoolClass: SchoolClassDto,
                                               override val subject: SubjectDto,
                                               override val semester: SemesterDto) : SchoolClassSemesterSubjectDto {
}