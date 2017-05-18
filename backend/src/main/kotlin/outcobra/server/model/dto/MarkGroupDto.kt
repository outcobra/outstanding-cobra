package outcobra.server.model.dto

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class MarkGroupDto(val id: Long = 0,
                        val value: Double = 0.0,
                        val weight: Double = 0.0,
                        val marks: List<MarkDto> = listOf(),
                        val subjectId: Long = 0,
                        val parentGroupId: Long = 0,
                        val markGroups: List<Long> = listOf())