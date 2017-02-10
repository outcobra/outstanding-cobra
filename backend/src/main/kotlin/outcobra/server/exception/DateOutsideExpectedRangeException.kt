package outcobra.server.exception

/**
 * Can be thrown when there is a problem with dateRanges
 *  - start data is bigger than end date
 *  - date ranges overlap when it is not expected
 *
 *  @author Florian Bürgi
 *  @since <since>
 */
class DateOutsideExpectedRangeException(override val message: String) : BadRequestException(message) {
    constructor(errorEnum: ErrorEnum = ErrorEnum.START_BIGGER_THAN_END) : this(errorEnum.i18n)
}