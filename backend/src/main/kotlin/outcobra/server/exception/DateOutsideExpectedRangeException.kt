package outcobra.server.exception

class DateOutsideExpectedRangeException(override val message: String) : BadRequestException(message) {
    constructor(errorEnum: ErrorEnum = ErrorEnum.START_BIGGER_THAN_END) : this(errorEnum.i18n)
}