package outcobra.server.model.dto.timetable

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class TimetableWeekDto(val entries: MutableList<TimetableEntryDto>,
                            val weekOfYear: Int)