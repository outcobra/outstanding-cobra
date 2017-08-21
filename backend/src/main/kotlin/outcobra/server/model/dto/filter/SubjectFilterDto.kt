package outcobra.server.model.dto.filter

import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.dto.SubjectDto

data class SubjectFilterDto(val schoolClassSubjects: List<SchoolClassSubjects> = arrayListOf())

data class SchoolClassSubjects(val schoolClass: SchoolClassDto = SchoolClassDto(),
                               val subjects: List<SubjectDto> = arrayListOf())