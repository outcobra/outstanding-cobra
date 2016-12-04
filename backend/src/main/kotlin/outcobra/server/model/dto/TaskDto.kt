package outcobra.server.model.dto

import outcobra.server.model.Task
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink
import java.time.LocalDate

/**
 * Created by Vincent on 15.11.2016.
 */
data class TaskDto(
        val id: Long,
        val taskId: Long = 0,
        val name: String = "",
        val description: String,
        val todoDate: LocalDate,
        val dueDate: LocalDate,
        val effort: Int,
        val progress: Int) : OutcobraDto {

    override fun getIdentifier(): Long = taskId

    override fun getParentLink(): ParentLink = ParentLink.make(taskId, Task::class.java)

}