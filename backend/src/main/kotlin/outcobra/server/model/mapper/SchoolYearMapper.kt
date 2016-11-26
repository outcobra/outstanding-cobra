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
class SchoolYearMapper @Inject constructor(val semesterMapper: Mapper<Semester, SemesterDto>,
                                           val classRepository: SchoolClassRepository,
                                           val holidayRepository: HolidayRepository) : Mapper<SchoolYear, SchoolYearDto> {
    override fun fromDto(from: SchoolYearDto): SchoolYear {
        return SchoolYear(from.name, from.validFrom, from.validTo, classRepository.findOne(from.schoolClassId),
                holidayRepository.findAll(QHoliday.holiday.schoolYear.id.eq(from.schoolYearId)).toList(),
                from.semesters.map { semesterMapper.fromDto(it) })
    }

    override fun toDto(from: SchoolYear): SchoolYearDto {
        return SchoolYearDto(from.id, from.schoolClass.id,
                from.name, from.validFrom, from.validFrom, from.semesters.map { semesterMapper.toDto(it) })
    }
}