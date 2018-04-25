package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.*
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.HolidayRepository
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.model.repository.UserRepository
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
class SchoolYearMapper @Inject constructor(val semesterRepository: SemesterRepository,
                                           val classRepository: SchoolClassRepository,
                                           val userRepository: UserRepository,
                                           val holidayRepository: HolidayRepository)
    : Mapper<SchoolYear, SchoolYearDto>, BaseMapper() {

    override fun fromDto(from: SchoolYearDto): SchoolYear {
        validateChildren(from.semesterIds, Semester::class, from.userId, User::class)
        val holidays = holidayRepository.findAll(QHoliday.holiday.schoolYear.id.eq(from.id)).toList()
        val schoolClasses = from.schoolClassIds.map { classRepository.findOne(it) }
        val semesters = from.semesterIds.map { semesterRepository.findOne(it) }
        val user = userRepository.findOne(from.userId)
        val schoolYear = SchoolYear(from.name, from.validFrom, from.validTo, user, schoolClasses, holidays, semesters)
        schoolYear.id = from.id
        return schoolYear
    }

    override fun toDto(from: SchoolYear): SchoolYearDto {
        val semesters = from.semesters.map { it.id }
        return SchoolYearDto(from.id, from.schoolClasses.map { it.id }, from.name, from.validFrom, from.validTo, from.user.id, semesters)
    }
}