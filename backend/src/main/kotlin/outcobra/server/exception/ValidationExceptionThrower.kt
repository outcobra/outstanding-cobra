package outcobra.server.exception


/**
 * This interface defines all functions that are used to throw our ValidationExceptions
 * @author Florian Bürgi
 * @since <since>
 */
interface ValidationExceptionThrower {

    @Throws(ValidationException::class)
    fun throwException(): Nothing

    fun makeException(nestedCause: Throwable? = null, messageLevel: MessageLevel? = null): ValidationException
}