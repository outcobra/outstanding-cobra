package outcobra.server.model.mapper.manage

import org.springframework.stereotype.Component
import outcobra.server.model.domain.Institution
import outcobra.server.model.dto.manage.old.*
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.mapper.ColorMapper
import javax.inject.Inject

@Component
class ManageDtoMapper @Inject constructor(val colorMapper: ColorMapper) : Mapper<List<Institution>, ManageDto> {
    override fun fromDto(from: ManageDto): List<Institution> {
        throw UnsupportedOperationException("this operation will not be used")
    }

    override fun toDto(from: List<Institution>): ManageDto {
        return ManageDto(from.map { toInternalDto(it) })
    }

    private fun toInternalDto(from: Institution): InstitutionDto {
        return InstitutionDto(from.id, from.name, from.schoolClasses.map { schoolClass ->
            SchoolClassDto(schoolClass.id, schoolClass.normalizedName, from.id,
                    schoolClass.schoolYears.map { year ->
                        SchoolYearDto(year.id, year.name, year.validFrom, year.validTo, schoolClass.id,
                                year.semesters.map { semester ->
                                    SemesterDto(semester.id, semester.name, semester.validFrom, semester.validTo, year.id,
                                            semester.subjects
                                                    .filter { it.schoolClasses.contains(schoolClass) }
                                                    .map { subject ->
                                                        SubjectDto(subject.id,
                                                                subject.name, colorMapper.toDto(subject.color), semester.id)
                                                    })
                                })
                    })
        })
    }
}