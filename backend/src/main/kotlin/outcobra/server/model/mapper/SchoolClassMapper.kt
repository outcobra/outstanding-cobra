package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.SchoolClass
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import javax.inject.Inject

/**
 * @since 1.0.0
 */
@Component
class SchoolClassMapper @Inject constructor(val institutionRepository: InstitutionRepository) : Mapper<SchoolClass, SchoolClassDto> {
    override fun toDto(from: SchoolClass): SchoolClassDto = SchoolClassDto(from.id, from.institution.id, from.normalizedName)

    override fun fromDto(from: SchoolClassDto): SchoolClass {
        val schoolClass = SchoolClass(from.normalizedName, null, mutableListOf())
        schoolClass.id = from.id
        schoolClass.institution = when (from.institutionId) {
            in 1L..Long.MAX_VALUE -> institutionRepository.findOne(from.institutionId)
            else -> null
        }
        return schoolClass
    }
}