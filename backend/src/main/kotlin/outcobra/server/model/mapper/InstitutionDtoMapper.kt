package outcobra.server.model.mapper

import outcobra.server.model.Institution
import outcobra.server.model.dto.InstitutionDto

/**
 * Created by Florian on 30.10.2016.
 */
class InstitutionDtoMapper : Mapper<Institution, InstitutionDto> {
    override fun toDto(from: Institution) = InstitutionDto(from.id, from.name)


    override fun fromDto(from: InstitutionDto): Institution {
        var institution = Institution()
        institution.id = from.institutionId
        institution.name = from.institutionName
        return institution
    }
}
