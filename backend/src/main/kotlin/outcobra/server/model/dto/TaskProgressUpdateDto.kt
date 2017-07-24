package outcobra.server.model.dto

/**
 * @author Mario Kunz
 * @since 1.1.0
 */
data class TaskProgressUpdateDto(val taskId: Long = 0,
                                 val progress: Int = 0)