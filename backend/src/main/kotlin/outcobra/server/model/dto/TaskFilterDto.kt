package outcobra.server.model.dto

data class TaskFilterDto(val schoolClassSubjects: List<SchoolClassSubjects>)
data class SchoolClassSubjects(val schoolClass: SchoolClassDto,
                               val subjects: List<SubjectDto>)