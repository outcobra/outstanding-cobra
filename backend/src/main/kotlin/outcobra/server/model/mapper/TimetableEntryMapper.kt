package outcobra.server.model.mapper

import outcobra.server.model.TimetableEntry
import outcobra.server.model.dto.timetable.TimetableEntryDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.model.repository.SubjectRepository
import outcobra.server.model.repository.TimetableRepository
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.LocalTime
import java.time.temporal.ChronoUnit
import java.time.temporal.TemporalAdjusters
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
class TimetableEntryMapper @Inject constructor(val subjectRepository: SubjectRepository,
                                               val semesterRepository: SemesterRepository,
                                               val timetableRepository: TimetableRepository)
    : Mapper<TimetableEntry, TimetableEntryDto>, BaseMapper() {

    override fun fromDto(from: TimetableEntryDto): TimetableEntry {
        val subject = subjectRepository.findOne(from.subjectId)
        val weekOffset = (from.firstOccurrenceAtNthWeekOfSemester - 1).toLong()
        val semesterStartDate: LocalDate = semesterRepository.findOne(subject.semester!!.id).validFrom
        val dayOfWeek = DayOfWeek.valueOf(from.weekDay.name)
        val firstOccurrenceAt = semesterStartDate
                .plusWeeks(weekOffset)
                .with(TemporalAdjusters.nextOrSame(dayOfWeek))
        val timetable = timetableRepository.findOne(from.timetableId)
        val timetableEntry = TimetableEntry(from.weekDay, from.time, from.repeatEveryNthWeek, firstOccurrenceAt,
                from.location, timetable, subject)
        timetableEntry.id = from.id
        return timetableEntry
    }

    override fun toDto(from: TimetableEntry): TimetableEntryDto {
        val subjectName = from.subject?.name ?: ""
        val time = from.time ?: LocalTime.of(8, 0)
        val room = from.room ?: ""
        val semesterStartDate = from.subject!!.semester!!.validFrom
        val weekOffset = (ChronoUnit.WEEKS.between(semesterStartDate, from.firstOccurrenceAt) + 1).toInt()
        val subjectId = from.subject?.id ?: 0L
        val timetableId = from.timetable?.id ?: 0L
        return TimetableEntryDto(from.id, subjectName, from.weekDay,
                time, room, from.repeatEveryNWeeks, weekOffset, subjectId, timetableId)
    }
}