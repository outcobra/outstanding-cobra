package outcobra.server.model.dto.timetable

import outcobra.server.model.Subject
import outcobra.server.model.Timetable
import outcobra.server.model.WeekDay
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink
import java.time.LocalTime


/**
 * @author Florian Bürgi
 * @since <since>
 *
 * @param id
 * @param subjectName the name of the [Subject] represented by this entry
 * @param weekDay the [WeekDay] the subject/entry takes place
 * @param time
 * @param location
 * @param repeatEveryNthWeek indicates how often a subject takes place the minimal value is 1
 * @param firstOccurrenceAtNthWeekOfSemester to determine whatever a lesson takes place or not
 * @param subjectId used for mapping purposes if name is not unique / if passed it outranks the subjectName
 * @param timetableId used for parent object references
 */
data class TimetableEntryDto(val id: Long = 0,
                             val subjectName: String = "",
                             val weekDay: WeekDay = WeekDay.MONDAY,
                             val time: LocalTime = LocalTime.of(8, 15),
                             val location: String = "",
                             val repeatEveryNthWeek: Int = 1,
                             val firstOccurrenceAtNthWeekOfSemester: Int = 1,
                             val subjectId: Long = 0L,
                             val timetableId: Long = 0L) : OutcobraDto {


    override val parentLink: ParentLink
        get() = ParentLink.make(timetableId, Timetable::class.java)

    override val identifier: Long
        get() = id

}