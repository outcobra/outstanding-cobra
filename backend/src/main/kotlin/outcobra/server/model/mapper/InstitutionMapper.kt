package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Institution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.UserRepository
import javax.inject.Inject

@Component
open class InstitutionMapper @Inject constructor(private val userRepository: UserRepository) : Mapper<Institution, InstitutionDto> {

    override fun fromDto(from: InstitutionDto?): Institution {
        if (from == null) return Institution()

        return Institution(from.name, userRepository.findOne(from.userId), null, null)
    }

    override fun toDto(from: Institution?): InstitutionDto {
        if (from == null) return InstitutionDto(-1, "", -1)

        return InstitutionDto(from.id, from.name, from.user.id)
    }
}