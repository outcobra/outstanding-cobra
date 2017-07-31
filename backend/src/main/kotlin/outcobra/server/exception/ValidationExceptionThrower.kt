package outcobra.server.exception


/**
 * This interface defines all functions that are used to throw our ValidationExceptions
 * @author Florian Bürgi
 * @since 1.1.0
 */
interface ValidationExceptionThrower {

    /**
     * This function throws a [ValidationException]
     * @param messageLevel the [MessageLevel] for the exception
     * @throws ValidationException
     */
    @Throws(ValidationException::class)
    fun throwException(messageLevel: MessageLevel? = null): Nothing

    /**
     * This function throws a [ValidationException]
     * @param messageLevel the [MessageLevel] for the exception
     * @param nestedCause the root-cause of the exception you want to throw
     * @throws ValidationException
     */
    @Throws(ValidationException::class)
    fun throwWithCause(nestedCause: Throwable, messageLevel: MessageLevel? = null): Nothing

    /**
     * This function is used to build the exception in the first place
     * @param messageLevel the [MessageLevel] the thrown message should have
     * @param nestedCause the root-cause of the exception you want to throw
     */
    fun makeException(messageLevel: MessageLevel? = null, nestedCause: Throwable? = null): ValidationException

}