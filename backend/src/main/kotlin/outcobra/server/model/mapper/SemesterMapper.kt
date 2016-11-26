package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.QTimetable
import outcobra.server.model.Semester
import outcobra.server.model.Subject
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.dto.SubjectDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.MarkReportRepository
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.model.repository.TimetableRepository
import javax.inject.Inject

/**
 * Maps [Semester]s to [SemesterDto]s and back
 *
 * @author Florian Bürgi
 * @since <version>
 */
@Component
open class SemesterMapper @Inject constructor(val subjectMapper: Mapper<Subject, SubjectDto>,
                                              val schoolYearRepository: SchoolYearRepository,
                                              val markReportRepository: MarkReportRepository,
                                              val timetableRepository: TimetableRepository)   : Mapper<Semester, SemesterDto> {
    override fun toDto(from: Semester): SemesterDto {
        return SemesterDto(from.id, from.schoolYear.id, from.name, from.validFrom, from.validTo, from.subjects.map { subjectMapper.toDto(it) },from.markReports.map { it.id }, from.timetable.id)
    }

    override fun fromDto(from: SemesterDto): Semester {
        return Semester(from.semesterName, from.validFrom, from.validTo, schoolYearRepository.findOne(from.schoolYearId),
                from.subjects.map { subjectMapper.fromDto(it) }, from.markReportIds.map { markReportRepository.findOne(it) },
                timetableRepository.findOne(QTimetable.timetable.semester.id.eq(from.id)))
    }
}