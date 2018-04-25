package outcobra.server.model.dto

import outcobra.server.model.domain.Exam
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
data class ExamTaskDto(val id: Long = 0,
                       val task: String = "",
                       val finished: Boolean = false,
                       var examId: Long = 0) : OutcobraDto {

    override val identifier: Long
        get() = id
    override val parentLink: ParentLink
        get() = ParentLink.make(examId, Exam::class.java)
}