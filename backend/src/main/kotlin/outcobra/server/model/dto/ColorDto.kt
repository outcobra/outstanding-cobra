package outcobra.server.model.dto

import outcobra.server.annotation.NoArgConstructor

/**
 * @author Mario Kunz
 */
@NoArgConstructor
data class ColorDto(val name: String = "",
                    val hex: String = "",
                    var index: Int = 0)