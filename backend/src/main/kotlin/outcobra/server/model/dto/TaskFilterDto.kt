package outcobra.server.model.dto

data class TaskFilterDto(val schoolClassSubjects: List<SchoolClassSubjects> = arrayListOf())

data class SchoolClassSubjects(val schoolClass: SchoolClassDto = SchoolClassDto(),
                               val subjects: List<SubjectDto> = arrayListOf())