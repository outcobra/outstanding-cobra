package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.QHoliday
import outcobra.server.model.SchoolYear
import outcobra.server.model.Semester
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.HolidayRepository
import outcobra.server.model.repository.SchoolClassRepository
import javax.inject.Inject

@Component
open class SchoolYearMapper @Inject constructor(val semesterMapper: Mapper<Semester, SemesterDto>,
                                                val classRepository: SchoolClassRepository,
                                                val holidayRepository: HolidayRepository) : Mapper<SchoolYear, SchoolYearDto> {

    override fun fromDto(from: SchoolYearDto): SchoolYear {
        val holidays = holidayRepository.findAll(QHoliday.holiday.schoolYear.id.eq(from.id)).toList()
        val schoolClass = classRepository.findOne(from.schoolClassId)
        val semesters = from.semesters.map { semesterMapper.fromDto(it) }
        val schoolYear = SchoolYear(from.name, from.validFrom, from.validTo, schoolClass, holidays, semesters)
        schoolYear.id = from.id
        return schoolYear
    }

    override fun toDto(from: SchoolYear): SchoolYearDto {
        val semesters = from.semesters.map { semesterMapper.toDto(it) }
        return SchoolYearDto(from.id, from.schoolClass.id, from.name, from.validFrom, from.validFrom, semesters)
    }
}