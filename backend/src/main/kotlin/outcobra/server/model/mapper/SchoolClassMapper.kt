package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.SchoolClass
import outcobra.server.model.SchoolYear
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import javax.inject.Inject

/**
 * @since 1.0.0
 */
@Component
class SchoolClassMapper @Inject constructor(val schoolYearMapper: Mapper<SchoolYear, SchoolYearDto>, val institutionRepository: InstitutionRepository) : Mapper<SchoolClass, SchoolClassDto> {
    override fun toDto(from: SchoolClass): SchoolClassDto {
        return SchoolClassDto(from.id, from.institution.id, from.normalizedName, from.schoolYears.map { schoolYearMapper.toDto(it) })
    }

    override fun fromDto(from: SchoolClassDto): SchoolClass {
        return SchoolClass(from.normalizedName, institutionRepository.findOne(from.institutionId), from.schoolYears.map { schoolYearMapper.fromDto(it) })
    }
}