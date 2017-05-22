package outcobra.server.model.dto

import outcobra.server.exception.ValidationKey
import outcobra.server.model.MarkGroup
import outcobra.server.model.Subject
import outcobra.server.model.dto.mark.BaseMarkDto
import outcobra.server.model.interfaces.ParentLink

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class MarkGroupDto(override val id: Long = 0,
                        override val value: Double = 0.0,
                        override val weight: Double = 0.0,
                        override val description: String = "",
                        val marks: List<MarkDto> = listOf(),
                        val subjectId: Long = 0,
                        val parentGroupId: Long = 0,
                        val markGroups: List<Long> = listOf()) : BaseMarkDto {

    override fun getIdentifier(): Long = id

    override fun getParentLink(): ParentLink {
        if (!(subjectId == 0L).xor(parentGroupId == 0L)) {
            ValidationKey.INVALID_DTO.throwException()
        } else if (parentGroupId != 0L) {
            return ParentLink.make(parentGroupId, MarkGroup::class.java)
        }
        return ParentLink.make(subjectId, Subject::class.java)
    }
}