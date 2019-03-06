package outcobra.server.model.dto

import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.UserParentLinkedDto

data class SchoolClassDto(val id: Long = 0,
                          override var userId: Long = 0,
                          val normalizedName: String = "",
                          val semesterSubjects: List<SchoolClassDto.SemesterSubjectDto> = listOf()) : UserParentLinkedDto, OutcobraDto {

    override val identifier: Long
        get() = id

    data class SemesterSubjectDto(val semesterId: Long,
                                  val subjectIds: List<Long>)
}