package outcobra.server.model.dto

import outcobra.server.model.Exam
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class ExamTaskDto(val id: Long = 0,
                       val task: String = "",
                       val finished: Boolean = false,
                       var examId: Long = 0) : OutcobraDto {

    override fun getIdentifier(): Long = id
    override fun getParentLink(): ParentLink = ParentLink.make(examId, Exam::class.java)
}