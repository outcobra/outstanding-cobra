package outcobra.server.exception

enum class ErrorEnum(val i18n: String = "") {
    SCHOOL_YEAR_OVERLAP(),
    ID_NOT_FOUND(),
    INVALID_DTO(),
    START_BIGGER_THAN_END(),
    ;
}
