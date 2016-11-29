package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Institution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.service.UserService
import javax.inject.Inject

@Component
open class InstitutionMapper
@Inject
constructor(val userService: UserService) : Mapper<Institution, InstitutionDto> {

    override fun toDto(from: Institution) = InstitutionDto(from.id, from.user.id, from.name)

    override fun fromDto(from: InstitutionDto): Institution {
        val institution = Institution()
        institution.id = from.id
        institution.name = from.name
        institution.user = when (from.userId) {
            in 1L..Long.MAX_VALUE -> userService.readUserById(from.userId)
            else -> userService.getCurrentUser()
        }
        return institution
    }
}