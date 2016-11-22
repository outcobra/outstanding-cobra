package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.model.repository.TimetableRepository
import javax.inject.Inject

/**
 * Maps [Semester]s to [SemesterDto]s and back
 *
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
open class SemesterMapper
@Inject
constructor(val schoolYearRepository: SchoolYearRepository,
            val timetableRepository: TimetableRepository) : Mapper<Semester, SemesterDto> {
    override fun toDto(from: Semester): SemesterDto = SemesterDto(from.id, from.schoolYear.id, from.timetable.id, from.name, from.validFrom, from.validTo)

    override fun fromDto(from: SemesterDto): Semester {
        val semester = Semester(from.name, from.validFrom, from.validTo, null, mutableListOf(), mutableListOf(), null)
        semester.id = from.id
        semester.schoolYear = when (from.schoolYearId) {
            in 1L..Long.MAX_VALUE -> schoolYearRepository.findOne(from.schoolYearId)
            else -> null
        }
        semester.timetable = when (from.timetableId) {
            in 1L..Long.MAX_VALUE -> timetableRepository.findOne(from.timetableId)
            else -> null
        }
        return semester
    }
}