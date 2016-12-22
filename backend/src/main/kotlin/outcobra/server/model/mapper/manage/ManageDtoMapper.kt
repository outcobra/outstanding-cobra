package outcobra.server.model.mapper.manage

import org.springframework.stereotype.Component
import outcobra.server.model.Institution
import outcobra.server.model.dto.manage.*
import outcobra.server.model.interfaces.Mapper

@Component
open class ManageDtoMapper : Mapper<List<Institution>, ManageDto> {
    override fun fromDto(from: ManageDto?): List<Institution> {
        throw UnsupportedOperationException("this operation will not be used")
    }

    override fun toDto(from: List<Institution>?): ManageDto {
        return if (from != null) ManageDto(from.map { toInternalDto(it) }) else null!!
    }

    private fun toInternalDto(from: Institution): InstitutionDto {
        return InstitutionDto(from.id, from.name, from.schoolClasses.map { schoolClass ->
            SchoolClassDto(schoolClass.id, schoolClass.normalizedName, from.id,
                    schoolClass.schoolYears.map { year ->
                        SchoolYearDto(year.id, year.name, year.validFrom, year.validTo, schoolClass.id,
                                year.semesters.map { semester ->
                                    SemesterDto(semester.id, semester.name, semester.validTo, semester.validFrom, year.id,
                                            semester.subjects.map { subject -> SubjectDto(subject.id, subject.name, semester.id) })
                                })
                    })
        })
    }
}