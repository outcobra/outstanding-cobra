package outcobra.server.util

import outcobra.server.model.SchoolYear
import outcobra.server.model.Semester
import outcobra.server.model.User
import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate

/*
 * Utility class which contains extension functions for already existing classes
 * see: https://kotlinlang.org/docs/reference/extensions.html#extension-functions
 */

fun LocalDate.isBeforeOrEqual(b: LocalDate): Boolean = this.isBefore(b) || this.isEqual(b)
fun LocalDate.isAfterOrEqual(b: LocalDate): Boolean = this.isAfter(b) || this.isEqual(b)

infix fun SchoolYear.doesNotOverlap(schoolYear: SchoolYear): Boolean =
        this.id == schoolYear.id || !DateUtil.isOverlap(this.validFrom, this.validTo, schoolYear.validFrom, schoolYear.validTo)

operator infix fun SchoolYear.contains(semester: Semester): Boolean =
        this.validFrom.isBeforeOrEqual(semester.validFrom) && this.validTo.isAfterOrEqual(semester.validTo)

infix fun Semester.doesNotOverlap(semester: Semester): Boolean =
        this.id == semester.id || !DateUtil.isOverlap(this.validFrom, this.validTo, semester.validFrom, semester.validTo)


tailrec fun ParentLinked.followToUser(): User {
    if (this is User) return this
    val parentLinked = this.parent
    return parentLinked.followToUser()
}