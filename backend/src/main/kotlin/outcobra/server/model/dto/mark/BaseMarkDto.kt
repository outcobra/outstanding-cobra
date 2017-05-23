package outcobra.server.model.dto.mark

import outcobra.server.model.Mark
import outcobra.server.model.interfaces.OutcobraDto

/**
 * This interface defines what all [Mark] related Dto's have in common
 * @implements [OutcobraDto]
 * @author Florian Bürgi
 * @since <since>9
 */
interface BaseMarkDto : OutcobraDto {
    val id: Long
    val value: Double
    val weight: Double
    val description: String
}