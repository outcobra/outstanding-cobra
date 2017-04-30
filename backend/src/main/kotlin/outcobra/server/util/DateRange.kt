package outcobra.server.util

import outcobra.server.exception.ValidationException
import outcobra.server.exception.ValidationKey.START_BIGGER_THAN_END
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
     * checks if the range of the first 2 params overlap with the range of the second 2 params
     * @return [Boolean] date ranges do overlap or not
     * @throws  [START_BIGGER_THAN_END] as a [ValidationException] if the range is invalid
     */
    @Throws(ValidationException::class)
    infix fun checkOverlap(otherRange: DateRange): Boolean {
        if (!(from.isBefore(to) && otherRange.from.isBefore(otherRange.to))) {
            START_BIGGER_THAN_END.throwException()
        }
        return from.isBeforeOrEqual(otherRange.to) && to.isAfterOrEqual(otherRange.from)
    }
}