package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Institution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.interfaces.Mapper

/**
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
class InstitutionMapper : Mapper<Institution, InstitutionDto>, BaseMapper() {

    override fun toDto(from: Institution) = InstitutionDto(from.id ?: 0, from.user.id, from.name)

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