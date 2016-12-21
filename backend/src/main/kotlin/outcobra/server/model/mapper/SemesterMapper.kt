package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.QTimetable
import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.MarkReportRepository
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.model.repository.SubjectRepository
import outcobra.server.model.repository.TimetableRepository
import javax.inject.Inject

/**
 * Maps [Semester]s to [SemesterDto]s and back
 *
 * @author Florian Bürgi
 * @since <version>
 */
@Component
open class SemesterMapper @Inject constructor(val subjectRepository: SubjectRepository,
                                              val schoolYearRepository: SchoolYearRepository,
                                              val markReportRepository: MarkReportRepository,
                                              val timetableRepository: TimetableRepository) : Mapper<Semester, SemesterDto> {
    override fun toDto(from: Semester): SemesterDto {
        val subjects = from.subjects.map { it.id }
        val reports = from.markReports.map { it.id }
        val timetableId = if (from.timetable != null) from.timetable.id else -1 // TODO still ugly tough
        return SemesterDto(from.id, from.schoolYear.id, from.name, from.validFrom, from.validTo, subjects, reports, timetableId)
    }

    override fun fromDto(from: SemesterDto): Semester {
        val year = schoolYearRepository.findOne(from.schoolYearId)
        val subjects = from.subjectIds.map { subjectRepository.findOne(it) }
        val reports = from.markReportIds.map { markReportRepository.findOne(it) }
        val timeTable = timetableRepository.findOne(QTimetable.timetable.semester.id.eq(from.identifier))
        val semester = Semester(from.name, from.validFrom, from.validTo, year, subjects, reports, timeTable)
        semester.id = from.id
        return semester
    }
}