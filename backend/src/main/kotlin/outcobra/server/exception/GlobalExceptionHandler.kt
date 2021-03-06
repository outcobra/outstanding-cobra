package outcobra.server.exception

import org.springframework.http.HttpStatus
import org.springframework.http.converter.HttpMessageNotWritableException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus
import javax.persistence.EntityNotFoundException

/**
 * Handles exceptions globally
 *
 * @author Florian Bürgi
 * @since 1.1.0
 */
@ControllerAdvice
class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(ValidationException::class)
    @ResponseBody
    fun handleValidationException(exception: ValidationException): ValidationException {
        return exception
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(NoRepositoryFoundException::class)
    @ResponseBody
    fun handleRepoException(exception: NoRepositoryFoundException): ValidationException {
        return ValidationKey.SERVER_ERROR.makeException(nestedCause = exception)
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EntityNotFoundException::class)
    @ResponseBody
    fun handleNotFound(exception: EntityNotFoundException): ValidationException {
        exception.printStackTrace()
        return ValidationKey.ENTITY_NOT_FOUND.makeException(nestedCause = exception)
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(HttpMessageNotWritableException::class)
    @ResponseBody
    fun handleMessageNotWritableException(exception: HttpMessageNotWritableException): ValidationException {
        if (exception.cause is ValidationException) {
            return exception.cause as ValidationException
        }
        return ValidationKey.SERVER_ERROR.makeException(nestedCause = exception)
    }
}