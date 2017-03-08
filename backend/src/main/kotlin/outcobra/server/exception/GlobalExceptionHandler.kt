package outcobra.server.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus
import javax.persistence.EntityNotFoundException

/**
 * Handles exceptions globally
 *
 * @author Florian Bürgi
 * @since <since>
 */
@Suppress("unused")
@ControllerAdvice
open class GlobalExceptionHandler {
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EntityNotFoundException::class)
    @ResponseBody
    fun handleNotFound(exception: EntityNotFoundException): String? {
        return exception.message
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException::class)
    @ResponseBody
    fun handleBadRequest(exception: BadRequestException): String? {
        return exception.message
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(ManipulatedRequestException::class)
    @ResponseBody
    fun handleManipulation(exception: ManipulatedRequestException): String? {
        return exception.message
    }
}