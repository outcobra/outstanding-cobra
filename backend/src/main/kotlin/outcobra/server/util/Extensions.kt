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

/**
 * check if a date is before or equal to another
 * @param b the [LocalDate] the date you want to use as reference
 * @author Florian Bürgi
 * @since <since>
 * */
fun LocalDate.isBeforeOrEqual(b: LocalDate): Boolean = this.isBefore(b) || this.isEqual(b)

/**
 * check if a date is after or equal to another
 * @param b the [LocalDate]  you want to use as reference
 * @author Florian Bürgi
 * @since <since>
 */
fun LocalDate.isAfterOrEqual(b: LocalDate): Boolean = this.isAfter(b) || this.isEqual(b)

/**
 * this function helps to determine if two [SchoolYear]s overlap or not
 * @param schoolYear the [SchoolYear] you want to use as reference
 * @author Florian Bürgi
 * @since <since>
 */
infix fun SchoolYear.doesNotOverlap(schoolYear: SchoolYear): Boolean {
    if (this.id != schoolYear.id) {
        val thisRange = DateRange(this.validFrom, this.validTo)
        val otherRange = DateRange(schoolYear.validFrom, schoolYear.validTo)
        return !(thisRange checkOverlap otherRange)
    }
    return true
}

/**
 * this function helps to determine if a [SchoolYear] contains a [Semester]
 * @param semester the [semester] you want to validate
 * @author Florian Bürgi
 * @since <since>
 */
operator infix fun SchoolYear.contains(semester: Semester): Boolean =
        this.validFrom.isBeforeOrEqual(semester.validFrom) && this.validTo.isAfterOrEqual(semester.validTo)

/**
 * this function helps to determine if two [Semester]s overlap or not
 * @param semester the [Semester] you want to use as reference
 * @author Florian Bürgi
 * @since <since>
 */
infix fun Semester.doesNotOverlap(semester: Semester): Boolean {
    if (this.id != semester.id) {
        val thisRange = DateRange(this.validFrom, this.validTo)
        val otherRange = DateRange(semester.validFrom, semester.validTo)
        return !(thisRange checkOverlap otherRange)
    }
    return true
}


/**
 * determines the owner ([User]) of the given object
 * @author Florian Bürgi
 * @since <since>
 */
tailrec fun ParentLinked.followToUser(): User {
    if (this is User) return this
    val parentLinked = this.parent
    return parentLinked.followToUser()
}

/**
 * Upper-Cases the first character of a string
 *
 * @author Joel Messerli
 * @since 1.0.0
 */
fun String.firstToUpper(): String {
    if (this.isEmpty()) return this
    if (this.length == 1) return this.toUpperCase()
    return this.substring(0, 1).toUpperCase() + this.substring(1, this.length)
}

/**
 * Lower-Cases the first character of a string
 *
 * @author Joel Messerli
 * @since 1.0.0
 */
fun String.firstToLower(): String {
    if (this.isNullOrEmpty()) return this
    return substring(0, 1).toLowerCase() + substring(1, length)
}