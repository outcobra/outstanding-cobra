package outcobra.server.model.dto

import kotlin.comparisons.compareValuesBy

/**
 * @author Mario Kunz
 */
data class ColorDto(val name: String = "",
                    val hex: String = "",
                    var index: Int = 0)