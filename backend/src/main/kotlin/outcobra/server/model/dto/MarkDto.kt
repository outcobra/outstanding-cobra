package outcobra.server.model.dto

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class MarkDto(val id: Long = 0,
                   val value: Double = 0.0,
                   val weight: Double = 0.0,
                   val markGroupId: Long)