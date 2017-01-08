package outcobra.server.util

import outcobra.server.exception.DateOutsideExpectedRangeException
import java.time.LocalDate


class DateUtil {
    companion object {
        fun isOverlap(aStart: LocalDate, aEnd: LocalDate, bStart: LocalDate, bEnd: LocalDate): Boolean {
            if (!(aStart.isBefore(aEnd) && bStart.isBefore(bEnd))) {
                throw DateOutsideExpectedRangeException("the start-date is bigger or equal to the end-date")
            } else {
                return aStart.isBeforeOrEqual(bEnd) && aEnd.isAfterOrEqual(bStart)
            }
        }
    }
}