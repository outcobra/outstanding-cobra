package outcobra.server.model.mapper


import org.springframework.stereotype.Component
import outcobra.server.model.domain.Institution
import outcobra.server.model.domain.SchoolClass
import outcobra.server.model.domain.SchoolYear
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.model.repository.SubjectRepository
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
class SchoolClassMapper @Inject constructor(val schoolYearRepository: SchoolYearRepository,
                                            val institutionRepository: InstitutionRepository,
                                            val subjectRepository: SubjectRepository) :
        Mapper<SchoolClass, SchoolClassDto>, BaseMapper() {

    override fun toDto(from: SchoolClass): SchoolClassDto {
        return SchoolClassDto(from.id, from.institution!!.id, from.normalizedName, from.schoolYears.map { it.id }, from.subjects.map { it.id })
    }

    override fun fromDto(from: SchoolClassDto): SchoolClass {
        validateChildren(from.schoolYearIds, SchoolYear::class, from.institutionId, Institution::class)
        val institution = institutionRepository.findOne(from.institutionId)
        val years = from.schoolYearIds.map { schoolYearRepository.findOne(it) }.toMutableList()
        val subjects = from.subjectIds.map { subjectRepository.findOne(it) }.toMutableList()
        val schoolClass = SchoolClass(from.normalizedName, institution, years, mutableListOf(), subjects)
        schoolClass.id = from.id
        return schoolClass
    }
}