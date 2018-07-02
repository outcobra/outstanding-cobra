package outcobra.server.model.dto

import outcobra.server.model.domain.Subject
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink
import java.time.LocalDate

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
data class ExamDto(val id: Long = 0,
                   val name: String = "",
                   val description: String = "",
                   val date: LocalDate = LocalDate.now(),
                   val mark: MarkValueDto? = null,
                   var examTasks: MutableList<ExamTaskDto> = mutableListOf(),
                   override val schoolClass: SchoolClassDto,
                   override val subject: SubjectDto,
                   override val semester: SemesterDto) : SchoolClassSemesterSubjectDto, OutcobraDto {

    override val identifier: Long
        get() = id
    override val parentLink: ParentLink
        get() = ParentLink.make(subject.id, Subject::class.java)
}