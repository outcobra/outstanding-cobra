package outcobra.server.exception

/**
 * Contains errors and their i18n-Key for the client
 * mostly validation errors or things like "not found" etc.
 *
 * @author Florian Bürgi
 * @since 1.1.0
 */
enum class ValidationKey(val i18nMessage: String = "i18n.error.http.500.message",
                         val i18nTitle: String = "i18n.error.http.500.title") : ValidationExceptionThrower {

    SERVER_ERROR(),
    SCHOOL_YEAR_OVERLAP("i18n.modules.manage.schoolYear.error.overlap", "i18n.error.http.400.title"),
    ENTITY_NOT_FOUND("i18n.error.http.404.message", "i18n.error.http.404.title"),
    INVALID_DTO("i18n.error.http.400.message", "i18n.error.http.400.title"),
    START_BIGGER_THAN_END("i18n.common.form.error.dateToIsBeforeDateFrom", "i18n.error.http.400.title"),
    FORBIDDEN("i18n.error.http.403.message", "i18n.error.http.403.title"),
    SEMESTER_OVERLAP("i18n.modules.manage.semester.error.overlap", "i18n.error.http.400.title"),
    OUTSIDE_PARENT("i18n.error.validation.outsideParent.message", "i18n.error.validation.outsideParent.title"),
    INVALID_MARK("i18n.error.validation.mark", "i18n.error.http.400.title"),
    USER_NOT_IN_DATABASE_RELOGIN("i18n.error.validation.relogin", "i18n.error.http.400.title"),
    USER_NOT_SIGNED_UP("i18n.error.validation.notSignedUp", "i18n.error.http.400.title"),
    IDENTITY_PROVIDER_FAILED("i18n.error.auth.identityProvider", "i18n.error.http.400.title"),
    MAIL_OCCUPIED("i18n.error.auth.mailOccupied", "i18n.error.http.400.title"),
    NO_PASSWORD_MATCH("i18n.error.auth.password.noMatch", "i18n.error.http.400.title"),
    PASSWORDS_NOT_SAME("i18n.error.auth.password.notSame", "i18n.error.http.400.title"),
    PASSWORD_UNSAFE("i18n.error.auth.password.unsafe", "i18n.error.http.400.title");

    override fun makeException(messageLevel: MessageLevel?, nestedCause: Throwable?): ValidationException {

        val exception = ValidationException(message = this.i18nMessage, title = this.i18nTitle)
        if (messageLevel != null) {
            exception.messageLevel = messageLevel
        }
        if (nestedCause != null) {
            exception.cause = nestedCause
        }
        return exception
    }

    override fun throwException(messageLevel: MessageLevel?): Nothing {
        throw(makeException(messageLevel))
    }

    override fun throwWithCause(nestedCause: Throwable, messageLevel: MessageLevel?): Nothing {
        throw this.makeException(messageLevel, nestedCause)
    }
}
