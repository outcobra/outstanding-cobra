package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.QHoliday
import outcobra.server.model.SchoolClass
import outcobra.server.model.SchoolYear
import outcobra.server.model.Semester
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.HolidayRepository
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.model.repository.SemesterRepository
import javax.inject.Inject

@Component
open class SchoolYearMapper @Inject constructor(val semesterRepository: SemesterRepository,
                                                val classRepository: SchoolClassRepository,
                                                val holidayRepository: HolidayRepository)
    : Mapper<SchoolYear, SchoolYearDto>, BaseMapper() {

    override fun fromDto(from: SchoolYearDto): SchoolYear {
        validateChildren(from.semesterIds, Semester::class, from.schoolClassId, SchoolClass::class)
        val holidays = holidayRepository.findAll(QHoliday.holiday.schoolYear.id.eq(from.id)).toList()
        val schoolClass = classRepository.findOne(from.schoolClassId)
        val semesters = from.semesterIds.map { semesterRepository.findOne(it) }
        val schoolYear = SchoolYear(from.name, from.validFrom, from.validTo, schoolClass, holidays, semesters)
        schoolYear.id = from.id
        return schoolYear
    }

    override fun toDto(from: SchoolYear): SchoolYearDto {
        val semesters = from.semesters.map { it.id }
        val id = from.id ?: 0
        return SchoolYearDto(id, from.schoolClass.id, from.name, from.validFrom, from.validTo, semesters)
    }
}