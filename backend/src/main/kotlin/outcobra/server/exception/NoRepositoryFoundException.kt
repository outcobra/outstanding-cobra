package outcobra.server.exception

/**
 * Is thrown when a repository can not be found or has an invalid type
 *
 * @author Joel Messerli
 * @since 1.0.0
 */
class NoRepositoryFoundException(message: String, cause: Throwable? = null) : Exception(message, cause)