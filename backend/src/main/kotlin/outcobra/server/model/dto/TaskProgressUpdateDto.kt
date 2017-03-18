package outcobra.server.model.dto

/**
 * @author Mario Kunz
 * @since <since>
 */
data class TaskProgressUpdateDto(val taskId: Long = 0,
                                 val progress: Int = 0)