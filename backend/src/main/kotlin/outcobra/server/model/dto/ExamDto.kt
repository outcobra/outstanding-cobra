package outcobra.server.model.dto

import outcobra.server.model.Subject
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
                   val date: LocalDate? = null,
                   val mark: MarkValueDto? = null,
                   val examTasks: List<ExamTaskDto> = listOf(),
                   val subject: SubjectDto = SubjectDto()) : OutcobraDto {

    override fun getIdentifier(): Long = id
    override fun getParentLink(): ParentLink = ParentLink.make(subject.id, Subject::class.java)
}