package outcobra.server.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import javax.persistence.EntityNotFoundException

/**
 * Handles exceptions globally
 *
 * @author Florian Bürgi
 * @since <since>
 */
@Suppress("unused")
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
    fun handleRepoException(exception: NoRepositoryFoundException) {
        return ValidationKey.SERVER_ERROR.run { makeException(i18nMessage, i18nTitle, MessageLevel.ERROR, exception) }
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EntityNotFoundException::class)
    @ResponseBody
    fun handleNotFound(exception: EntityNotFoundException): ValidationException {
        return ValidationKey.ID_NOT_FOUND.run { makeException(i18nMessage, i18nTitle, MessageLevel.ERROR, exception) }
    }
}