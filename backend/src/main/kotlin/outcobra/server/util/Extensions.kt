package outcobra.server.util

import io.jsonwebtoken.Claims
import org.springframework.security.core.context.SecurityContext
import outcobra.server.exception.ValidationException
import outcobra.server.exception.ValidationKey
import outcobra.server.model.SchoolYear
import outcobra.server.model.Semester
import outcobra.server.model.User
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.mark.BaseMarkDto
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.web.auth.model.JwtAuthenticationToken
import java.time.Instant
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*

/*
 * Utility class which contains extension functions for already existing classes
 * see: https://kotlinlang.org/docs/reference/extensions.html#extension-functions
 */

/**
 * check if a date is before or equal to another
 * @param b the [LocalDate] the date you want to use as reference
 * @author Florian Bürgi
 * @since 1.1.0
 * */
fun LocalDate.isBeforeOrEqual(b: LocalDate): Boolean = this.isBefore(b) || this.isEqual(b)

/**
 * check if a date is after or equal to another
 * @param b the [LocalDate]  you want to use as reference
 * @author Florian Bürgi
 * @since 1.1.0
 */
fun LocalDate.isAfterOrEqual(b: LocalDate): Boolean = this.isAfter(b) || this.isEqual(b)

/**
 * this function helps to determine if two [SchoolYear]s overlap or not
 * @param schoolYear the [SchoolYear] you want to use as reference
 * @author Florian Bürgi
 * @since 1.1.0
 */
infix fun SchoolYear.doesNotOverlap(schoolYear: SchoolYear): Boolean {
    if (this.id != schoolYear.id) {
        val thisRange = DateRange(this.validFrom, this.validTo)
        val otherRange = DateRange(schoolYear.validFrom, schoolYear.validTo)
        return !thisRange.checkOverlap(otherRange)
    }
    return true
}

/**
 * this function helps to determine if a [SchoolYear] contains a [Semester]
 * @param semester the [semester] you want to validate
 * @author Florian Bürgi
 * @since 1.1.0
 */
operator infix fun SchoolYear.contains(semester: Semester): Boolean =
        this.validFrom.isBeforeOrEqual(semester.validFrom) && this.validTo.isAfterOrEqual(semester.validTo)

/**
 * this function helps to determine if two [Semester]s overlap or not
 * @param semester the [Semester] you want to use as reference
 * @author Florian Bürgi
 * @since 1.1.0
 */
infix fun Semester.doesNotOverlap(semester: Semester): Boolean {
    if (this.id != semester.id) {
        val thisRange = DateRange(this.validFrom, this.validTo)
        val otherRange = DateRange(semester.validFrom, semester.validTo)
        return !thisRange.checkOverlap(otherRange)
    }
    return true
}


/**
 * determines the owner ([User]) of the given object
 * @author Florian Bürgi
 * @since 1.1.0
 */
tailrec fun ParentLinked.followToUser(iterationCount: Int = 0): User {
    if (iterationCount > 50) {
        @Suppress("UNREACHABLE_CODE")
        throw ValidationKey.INVALID_DTO.throwException()
    } else {
        if (this is User) return this
        val parentLinked = this.parent ?: ValidationKey.ENTITY_NOT_FOUND.throwException()
        return parentLinked.followToUser(iterationCount.inc())
    }
}

/**
 * determines if the [BaseMarkDto] is valid or not
 * @throws [ValidationException] if the mark is invalid
 * @author Florian Bürgi
 * @since 1.2.0
 */
fun BaseMarkDto.validate() {
    var valid = id == 0L
    valid = if (this is MarkGroupDto) {
        valid || (parentGroupId == 0L || markGroups.isEmpty())
    } else {
        valid || !(value > 6 || value < 1)
    }
    if (!valid) {
        ValidationKey.INVALID_MARK.throwException()
    }
}


fun Claims.setExpirationTime(dateTime: LocalDateTime) {
    val instant = Instant.from(dateTime.atZone(ZoneId.systemDefault()))
    this.expiration = Date.from(instant)
}

fun Claims.getExpirationTime(): LocalDateTime {
    val instant = Instant.ofEpochMilli(this.expiration.time)
    return LocalDateTime.ofInstant(instant, ZoneId.systemDefault())
}

val SecurityContext.jwtAuthentication
    get() = authentication as JwtAuthenticationToken
