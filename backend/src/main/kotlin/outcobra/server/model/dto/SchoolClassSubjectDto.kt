package outcobra.server.model.dto

data class SchoolClassSubjectDto(val schoolClass: SchoolClassDto = SchoolClassDto(),
                                 val subjects: List<SubjectDto> = arrayListOf())