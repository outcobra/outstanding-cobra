package outcobra.server.exception

class DateOutsideExpectedRangeException(override val message: String = "") : BadRequestException()