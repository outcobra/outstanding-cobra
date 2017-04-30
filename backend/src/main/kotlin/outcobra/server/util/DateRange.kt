package outcobra.server.util

import outcobra.server.exception.ValidationKey
import java.time.LocalDate

/**
 * Every instance of this class represents a range of time between two dates
 * @param from the start date  as a [LocalDate]
 * @param to the end date as a [LocalDate]
 * @author Florian Bürgi
 * @since <since>
 */
class DateRange(val from: LocalDate, val to: LocalDate) {

    /**
     * checks if the range of the first 2 params overlap with the rang of the second 2 params
     * @return [Boolean] date ranges do overlap or not
     */
    infix fun checkOverlap(dateRange: DateRange): Boolean {
        if (!(from.isBefore(to) && dateRange.from.isBefore(dateRange.to))) {
            ValidationKey.START_BIGGER_THAN_END.throwException()
            return false
        } else {
            return from.isBeforeOrEqual(dateRange.to) && to.isAfterOrEqual(dateRange.from)
        }
    }
}