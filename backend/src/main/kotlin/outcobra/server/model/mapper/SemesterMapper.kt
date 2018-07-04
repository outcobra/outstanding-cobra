package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.domain.*
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.*
import java.util.*
import javax.inject.Inject

/**
 * Maps [Semester]s to [SemesterDto]s and back
 *
 * @author Florian Bürgi
 * @since 1.1.0
 */
@Component
class SemesterMapper @Inject constructor(val schoolClassSemesterRepository: SchoolClassSemesterRepository,
                                         val schoolClassRepository: SchoolClassRepository,
                                         val semesterRepository: SemesterRepository,
                                         val schoolYearRepository: SchoolYearRepository,
                                         val timetableRepository: TimetableRepository)
    : Mapper<Semester, SemesterDto>, BaseMapper() {
    override fun toDto(from: Semester): SemesterDto {
        val semesterSubjects = from.schoolClassSemester.map {
            SemesterDto.SchoolClassSubjectDto(it.schoolClass.id,
                    it.subjects.map { sub -> sub.id }
            )
        }

        val timetableId = from.timetable?.id ?: 0L
        return SemesterDto(from.id, from.schoolYear!!.id, from.name, from.validFrom, from.validTo, listOf(), timetableId, semesterSubjects)
    }

    override fun fromDto(from: SemesterDto): Semester {
        //validateChildren(from.subjectIds, Subject::class, from.schoolYearId, SchoolYear::class)
        validateChildren(from.markReportIds, MarkReport::class, from.schoolYearId, SchoolYear::class)
        val year = schoolYearRepository.findOne(from.schoolYearId)
        val timeTable = timetableRepository.findOne(QTimetable.timetable.semester.id.eq(from.identifier))

        val semester = Semester(name = from.name,
                validFrom = from.validFrom,
                validTo = from.validTo,
                schoolYear = year,
                timetable = timeTable
        )

        semester.schoolClassSemester = from.schoolClassSubjectDto.map { it.schoolClassId }
                .distinct()
                .map {
                    Optional.ofNullable(schoolClassSemesterRepository.findOne(it))
                            .orElseGet { SchoolClassSemester(
                                    schoolClassRepository.findOne(it),
                                    semesterRepository.findOne(from.id) ?: semester
                            ) }
                }.toMutableList()

        semester.id = from.id
        return semester
    }
}