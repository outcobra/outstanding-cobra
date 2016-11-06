package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Institution
import outcobra.server.model.dto.InstitutionDto

@Component
class InstitutionDtoMapper : Mapper<Institution, InstitutionDto> {
    override fun toDto(from: Institution) = InstitutionDto(from.id, from.name)


    override fun fromDto(from: InstitutionDto): Institution {
        var institution = Institution()
        institution.id = from.institutionId
        institution.name = from.institutionName
        return institution
    }
}
