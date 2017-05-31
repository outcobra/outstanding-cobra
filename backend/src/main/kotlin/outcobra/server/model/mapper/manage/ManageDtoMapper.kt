package outcobra.server.model.mapper.manage

import org.springframework.stereotype.Component
import outcobra.server.exception.ValidationKey
import outcobra.server.model.Institution
import outcobra.server.model.dto.manage.*
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.mapper.ColorMapper
import javax.inject.Inject

@Component
class ManageDtoMapper @Inject constructor(val colorMapper: ColorMapper) : Mapper<List<Institution>, ManageDto> {
    override fun fromDto(from: ManageDto?): List<Institution> {
        throw UnsupportedOperationException("this operation will not be used")
    }

    override fun toDto(from: List<Institution>?): ManageDto {
        if (from != null) {
            return ManageDto(from.map { toInternalDto(it) })
        }
        ValidationKey.SERVER_ERROR.throwWithCause(NullPointerException())
    }

    private fun toInternalDto(from: Institution): InstitutionDto {
        return InstitutionDto(from.id ?: 0, from.name, from.schoolClasses.map { schoolClass ->
            SchoolClassDto(schoolClass.id ?: 0, schoolClass.normalizedName, from.id ?: 0,
                    schoolClass.schoolYears.map { year ->
                        SchoolYearDto(year.id ?: 0, year.name, year.validFrom, year.validTo, schoolClass.id ?: 0,
                                year.semesters.map { semester ->
                                    SemesterDto(semester.id ?: 0, semester.name, semester.validFrom, semester.validTo, year.id ?: 0,
                                            semester.subjects.map { subject ->
                                                SubjectDto(subject.id ?: 0,
                                                        subject.name, colorMapper.toDto(subject.color), semester.id ?: 0)
                                            })
                                })
                    })
        })
    }
}