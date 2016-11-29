package outcobra.server.model.dto

import outcobra.server.model.User
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class InstitutionDto(val id: Long = 0, val userId: Long = 0, val name: String = "", val schoolClasses: List<SchoolClassDto> = arrayListOf()) : OutcobraDto {
    override fun getIdentifier(): Long = id

    override fun getParentLink(): ParentLink = ParentLink.make(userId, User::class.java)
}