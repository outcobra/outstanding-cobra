package outcobra.server.util

import outcobra.server.exception.ValidationKey
import java.time.LocalDate

/**
 * DateUtil
 * util class for LocalDate objects
 *
 * @author Florian Bürgi
 * @since <since>
 */
class DateUtil {
    companion object {
        /**
         * checks if the range of the first 2 params overlap with the rang of the second 2 params
         * @return [Boolean] date ranges do overlap or not
         */
        fun isOverlap(aStart: LocalDate, aEnd: LocalDate, bStart: LocalDate, bEnd: LocalDate): Boolean {
            if (!(aStart.isBefore(aEnd) && bStart.isBefore(bEnd))) {
                ValidationKey.START_BIGGER_THAN_END.throwException()
                return true
            } else {
                return aStart.isBeforeOrEqual(bEnd) && aEnd.isAfterOrEqual(bStart)
            }
        }
    }
}