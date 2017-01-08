package outcobra.server.exception

class DateOutsideExpectedRangeException(override val message: String) : BadRequestException(message) {
    constructor(errorEnum: ErrorEnum) : this(errorEnum.i18n)
}