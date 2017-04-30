package outcobra.server.exception


/**
 * This interface defines all functions that are used to throw our ValidationExceptions
 * @author Florian Bürgi
 * @since <since>
 */
interface ValidationExceptionThrower {
    @Throws(ValidationException::class)
    fun throwException(): Unit

    fun makeException(messageLevel: MessageLevel?,
                      nestedCause: Throwable?): ValidationException
}