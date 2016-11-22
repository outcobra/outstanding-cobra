package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.SchoolYear
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SchoolClassRepository
import javax.inject.Inject

@Component
class SchoolYearMapper @Inject constructor(val schoolClassRepository: SchoolClassRepository) : Mapper<SchoolYear, SchoolYearDto> {
    override fun toDto(from: SchoolYear): SchoolYearDto = SchoolYearDto(from.id, from.schoolClass.id, from.name, from.validFrom, from.validTo)

    override fun fromDto(from: SchoolYearDto): SchoolYear {
        val schoolYear = SchoolYear(from.name, from.validFrom, from.validTo, null, mutableListOf(), mutableListOf())
        schoolYear.id = from.id
        schoolYear.schoolClass = when (from.schoolClassId) {
            in 1L..Long.MAX_VALUE -> schoolClassRepository.findOne(from.schoolClassId)
            else -> null
        }
        return schoolYear
    }
}