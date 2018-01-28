package outcobra.server.model.dto.timetable

import outcobra.server.model.WeekDay
import java.time.LocalDate

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class TimetableDayDto(val entries: MutableList<TimetableEntryDto>,
                           val date: LocalDate,
                           val weekDay: WeekDay)