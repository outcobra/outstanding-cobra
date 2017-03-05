package outcobra.server.exception

import outcobra.server.annotation.Open

/**
 * Can be thrown if a client makes a request with bad data
 *
 * @author Florian Bürgi
 * @since <since>
 */
@Open
class BadRequestException(override val message: String?) : RuntimeException() {
    constructor(errorEnum: ErrorEnum) : this(errorEnum.i18n)
}