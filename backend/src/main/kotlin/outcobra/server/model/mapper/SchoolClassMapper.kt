package outcobra.server.model.mapper


import org.springframework.stereotype.Component
import outcobra.server.model.Institution
import outcobra.server.model.SchoolClass
import outcobra.server.model.SchoolYear
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.SchoolYearRepository
import javax.inject.Inject

/**
 * @since 1.0.0
 */
@Component
open class SchoolClassMapper @Inject constructor(val schoolYearRepository: SchoolYearRepository,
                                                 val institutionRepository: InstitutionRepository) : Mapper<SchoolClass, SchoolClassDto>, BaseMapper() {

    override fun toDto(from: SchoolClass): SchoolClassDto {
        val id = from.id ?: 0
        return SchoolClassDto(id, from.institution.id, from.normalizedName, from.schoolYears.map { it.id })
    }

    override fun fromDto(from: SchoolClassDto): SchoolClass {
        validateChildren(from.schoolYearIds, SchoolYear::class, from.institutionId, Institution::class)
        val institution = institutionRepository.findOne(from.institutionId)
        val years = from.schoolYearIds.map { schoolYearRepository.findOne(it) }
        val schoolClass = SchoolClass(from.normalizedName, institution, years)
        schoolClass.id = from.id
        return schoolClass
    }
}