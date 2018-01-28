package outcobra.server.model.dto.timetable

import outcobra.server.model.Subject
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
 * @param time
 * @param location
 * @param repeatEveryNthWeek indicates how often a subject takes place the minimal value is 1
 * @param weekDay the [WeekDay] the subject/entry takes place
 * @param subjectId used for parent object references
 */
data class TimetableEntryDto(val id: Long = 0,
                             val subjectName: String = "",
                             val time: LocalTime = LocalTime.of(8, 15),
                             val location: String = "",
                             val repeatEveryNthWeek: Int = 1,
                             val weekDay: WeekDay = WeekDay.MONDAY,
                             val subjectId: Long = 0L) : OutcobraDto {

    override fun getIdentifier(): Long = id

    override fun getParentLink(): ParentLink = ParentLink.make(subjectId, Subject::class.java)
}