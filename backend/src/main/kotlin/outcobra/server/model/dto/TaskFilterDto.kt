package outcobra.server.model.dto

import outcobra.server.annotation.NoArgConstructor

@NoArgConstructor
data class TaskFilterDto(val schoolClassSubjects: List<SchoolClassSubjects>)

@NoArgConstructor
data class SchoolClassSubjects(val schoolClass: SchoolClassDto,
                               val subjects: List<SubjectDto>)