package outcobra.server.exception

/**
 * This [Exception] will be thrown if a user tries to do an unauthorized operation.
 * e.g.: tries to to modify an object he does not own
 * @author Florian Bürgi
 * @since <since>
 */
class ManipulatedRequestException(override val message: String? = "Security-check failed, request appears to be manipulated")
    : RuntimeException()