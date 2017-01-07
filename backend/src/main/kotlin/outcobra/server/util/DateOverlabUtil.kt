package outcobra.server.util

import outcobra.server.exception.DateOutsideExpectedRangeException
import java.time.LocalDate

class DateOverlabUtil {
    companion object {
        fun isOverlab(aStart: LocalDate, aEnd: LocalDate, bStart: LocalDate, bEnd: LocalDate): Boolean {
            if (!aStart.isBefore(aEnd) && bStart.isBefore(bEnd)) {
                throw DateOutsideExpectedRangeException("the start-date is bigger or equal to the end-date")
            } else {
                return isBeforeOrEqual(aStart, bEnd) && isAfterOrEqual(aEnd, bStart)
            }
        }

        private fun isBeforeOrEqual(a: LocalDate, b: LocalDate): Boolean = a.isBefore(b) || a.isEqual(b)

        private fun isAfterOrEqual(a: LocalDate, b: LocalDate): Boolean = a.isAfter(b) || a.isEqual(b)

    }
}