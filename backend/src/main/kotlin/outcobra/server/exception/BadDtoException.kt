package outcobra.server.exception

class BadDtoException(override val message: String = "received invalid Dto") : BadRequestException()