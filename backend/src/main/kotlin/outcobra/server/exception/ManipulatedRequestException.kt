package outcobra.server.exception

/**
 *
 * @author Florian Bürgi
 * @since <since>
 */
class ManipulatedRequestException(override val message: String? = "Security-check failed, request appears to be manipulated")
    : RuntimeException()