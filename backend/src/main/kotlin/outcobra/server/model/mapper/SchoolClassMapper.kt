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
open class SchoolClassMapper @Inject constructor(val schoolYearMapper: Mapper<SchoolYear, SchoolYearDto>,
                                                 val institutionRepository: InstitutionRepository) : Mapper<SchoolClass, SchoolClassDto> {

    override fun toDto(from: SchoolClass): SchoolClassDto {
        return SchoolClassDto(from.id, from.institution.id, from.normalizedName, from.schoolYears.map { schoolYearMapper.toDto(it) })
    }

    override fun fromDto(from: SchoolClassDto): SchoolClass {
        val institution = institutionRepository.findOne(from.institutionId)
        val years = from.schoolYears.map { schoolYearMapper.fromDto(it) }
        val schoolClass = SchoolClass(from.normalizedName, institution, years)
        schoolClass.id = from.id
        return schoolClass
    }
}