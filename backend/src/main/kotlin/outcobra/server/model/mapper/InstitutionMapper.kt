package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.Institution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.interfaces.Mapper

/**
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
class InstitutionMapper : Mapper<Institution, InstitutionDto>, BaseMapper() {

    override fun toDto(from: Institution): InstitutionDto {
        return InstitutionDto(from.id, from.user?.id ?: 0, from.name, from.schoolClasses.map { it.id })
    }

    override fun fromDto(from: InstitutionDto): Institution {
        val institution = Institution()
        institution.id = from.id
        institution.name = from.name
        institution.user = when (from.userId) {
            in 1L..Long.MAX_VALUE -> userService.readUserById(from.userId)
            else                  -> userService.getCurrentUser()
        }
        return institution
    }
}