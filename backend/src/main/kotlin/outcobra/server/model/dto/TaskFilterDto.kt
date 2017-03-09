package outcobra.server.model.dto

import outcobra.server.annotation.NoArgConstructor

@NoArgConstructor
data class TaskFilterDto(val schoolClassSubjects: List<SchoolClassSubjects> = arrayListOf())

@NoArgConstructor
data class SchoolClassSubjects(val schoolClass: SchoolClassDto = SchoolClassDto(),
                               val subjects: List<SubjectDto> = arrayListOf())