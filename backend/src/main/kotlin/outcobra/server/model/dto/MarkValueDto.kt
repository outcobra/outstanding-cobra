package outcobra.server.model.dto

import outcobra.server.model.MarkGroup
import outcobra.server.model.dto.mark.BaseMarkDto
import outcobra.server.model.interfaces.ParentLink

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
data class MarkValueDto(override val id: Long = 0,
                        override val value: Double = 0.0,
                        override val weight: Double = 0.0,
                        override val description: String = "",
                        val examId: Long = 0L,
                        var markGroupId: Long = 0) : BaseMarkDto {

    override fun getIdentifier(): Long = id
    override fun getParentLink(): ParentLink = ParentLink.make(markGroupId, MarkGroup::class.java)
}