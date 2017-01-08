package outcobra.server.util

import outcobra.server.model.SchoolYear
import outcobra.server.model.Semester
import java.time.LocalDate

fun LocalDate.isBeforeOrEqual(b: LocalDate): Boolean = this.isBefore(b) || this.isEqual(b)
fun LocalDate.isAfterOrEqual(b: LocalDate): Boolean = this.isAfter(b) || this.isEqual(b)

infix fun SchoolYear.doesNotOverlap(schoolYear : SchoolYear) : Boolean =
        !DateUtil.isOverlap(this.validFrom, this.validTo, schoolYear.validFrom, schoolYear.validTo)
infix fun Semester.doesNotOverlap(semester : Semester) : Boolean =
        !DateUtil.isOverlap(this.validFrom, this.validTo, semester.validFrom, semester.validTo)


