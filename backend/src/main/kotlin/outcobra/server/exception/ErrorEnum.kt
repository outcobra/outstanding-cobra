package outcobra.server.exception

/**
 * Contains errors and their i18n-Key for the client
 * mostly validation errors or things like "not found" etc.
 *
 * @author Florian Bürgi
 * @since <since>
 */
enum class ErrorEnum(val i18n: String = "") {
    SCHOOL_YEAR_OVERLAP(),
    ID_NOT_FOUND(),
    INVALID_DTO(),
    START_BIGGER_THAN_END();
}
