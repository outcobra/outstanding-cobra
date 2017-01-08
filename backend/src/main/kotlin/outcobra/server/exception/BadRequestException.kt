package outcobra.server.exception

open class BadRequestException(override val message: String?) : RuntimeException() {
    constructor(errorEnum: ErrorEnum) : this(errorEnum.i18n)
}