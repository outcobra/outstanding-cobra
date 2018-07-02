package outcobra.server.model.dto

import outcobra.server.model.domain.Institution
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class SchoolClassDto(val id: Long = 0,
                          val institutionId: Long = 0,
                          val normalizedName: String = "",
                          val semesterSubjects: List<SchoolClassDto.SemesterSubjectDto> = listOf()) : OutcobraDto {

    override val identifier: Long
        get() = id

    override val parentLink: ParentLink
        get() = ParentLink.make(institutionId, Institution::class.java)

    data class SemesterSubjectDto(val semesterId: Long,
                                  val subjectIds: List<Long>)
}