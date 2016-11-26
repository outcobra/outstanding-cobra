package outcobra.server.model.dto

import outcobra.server.model.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class InstitutionDto(val institutionId: Long = 0, val userId: Long = 0, val institutionName: String = "", val schoolClasses: List<SchoolClassDto> = arrayListOf()) : OutcobraDto {
    override fun getId(): Long = institutionId

    override fun getParentLink(): ParentLink = ParentLink.make(userId, User::class.java)
}