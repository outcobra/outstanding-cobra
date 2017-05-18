package outcobra.server.model.dto

import outcobra.server.exception.ValidationKey
import outcobra.server.model.MarkGroup
import outcobra.server.model.Subject
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

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
                        val markGroups: List<Long> = listOf()) : OutcobraDto {
    override fun getIdentifier(): Long = id

    override fun getParentLink(): ParentLink {
        if (!((subjectId == 0L || parentGroupId == 0L) && subjectId != parentGroupId)) {
            ValidationKey.INVALID_DTO.throwException()
        } else if (parentGroupId != 0L) {
            return ParentLink.make(parentGroupId, MarkGroup::class.java)
        } else {
            return ParentLink.make(subjectId, Subject::class.java)
        }
    }

}