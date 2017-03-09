package outcobra.server.model.dto

import outcobra.server.annotation.NoArgConstructor

/**
 * @author Mario Kunz
 * @since <since>
 */
@NoArgConstructor
data class TaskProgressUpdateDto(val taskId: Long = 0,
                                 val progress: Int = 0)