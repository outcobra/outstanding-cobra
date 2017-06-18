package outcobra.server.model.dto

import outcobra.server.model.Subject
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink
import java.time.LocalDate

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class ExamDto(val id: Long = 0,
                   val name: String = "",
                   val date: LocalDate? = null,
                   val subjectName: String = "",
                   val mark: MarkValueDto? = null,
                   val examTasks: List<ExamTaskDto> = listOf(),
                   val subjectId: Long = 0) : OutcobraDto {

    override fun getIdentifier(): Long = id
    override fun getParentLink(): ParentLink = ParentLink.make(subjectId, Subject::class.java)
}