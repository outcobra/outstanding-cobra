package outcobra.server.model.dto

import outcobra.server.model.MarkGroup
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class MarkDto(val id: Long = 0,
                   val value: Double = 0.0,
                   val weight: Double = 0.0,
                   val markGroupId: Long) : OutcobraDto {

    override fun getIdentifier(): Long = id
    override fun getParentLink(): ParentLink = ParentLink.make(markGroupId, MarkGroup::class.java)
}