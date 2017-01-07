package outcobra.server.model.dto

data class TaskFilterDto(val subjectClasses: List<ParentClass>)
data class ParentClass(val schoolClass: SchoolClassDto,
                       val subjects: List<SubjectDto>)