package outcobra.server.exception

class BadDtoException(override val message: String) : BadRequestException(message) {
    constructor(errorEnum: ErrorEnum = ErrorEnum.INVALID_DTO) : this(errorEnum.i18n)
}