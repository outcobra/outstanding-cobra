package outcobra.server.model.dto

import outcobra.server.model.MarkGroup
import outcobra.server.model.dto.mark.BaseMarkDto
import outcobra.server.model.interfaces.ParentLink

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class MarkValueDto(override val id: Long = 0,
                        override val value: Double = 0.0,
                        override val weight: Double = 0.0,
                        override val description: String,
                        val markGroupId: Long) : BaseMarkDto {

    override fun getIdentifier(): Long = id
    override fun getParentLink(): ParentLink = ParentLink.make(markGroupId, MarkGroup::class.java)
}