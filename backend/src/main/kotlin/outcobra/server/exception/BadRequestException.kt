package outcobra.server.exception

/**
 * Can be thrown if a client makes a request with bad data
 *
 * @author Florian Bürgi
 * @since <since>
 */
open class BadRequestException(override val message: String?) : RuntimeException() {
    constructor(errorEnum: ErrorEnum) : this(errorEnum.i18n)
}