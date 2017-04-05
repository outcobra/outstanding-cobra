package outcobra.server.exception

/**
 * Contains errors and their i18n-Key for the client
 * mostly validation errors or things like "not found" etc.
 *
 * @author Florian Bürgi
 * @since <since>
 */
data class ValidationKey(val i18nMessage: String = "i18n.error.generic.message",
                         val i18nTitle: String = "i18n.error.generic.title") : ValidationExceptionThrower {
    override fun throwException() {
        throw(makeException(this.i18nMessage, this.i18nTitle, null, null))
    }

    override fun makeException(message: String, title: String, messageLevel: MessageLevel?,
                               nestedCause: Throwable?): ValidationException {

        val e = ValidationException(message = message, title = title)
        if (messageLevel != null) {
            e.messageLevel = messageLevel
        }
        if (nestedCause != null) {
            e.cause = nestedCause
        }
        return e
    }

    fun makeException(): ValidationException {
        return makeException(i18nMessage, i18nTitle, null, null)
    }

    companion object {
        val SERVER_ERROR = ValidationKey()
        val SCHOOL_YEAR_OVERLAP = ValidationKey("i18n.modules.manage.schoolYear.error.overlap", "i18n.error.input.title")
        val ID_NOT_FOUND = ValidationKey("i18n.error.notFound.message", "i18n.error.notFound.title")
        val INVALID_DTO = ValidationKey("i18n.error.input.message", "i18n.error.input.title")
        val START_BIGGER_THAN_END = ValidationKey("i18n.common.form.error.dateToIsBeforeDateFrom", "i18n.error.input.title")
        val FORBIDDEN = ValidationKey("i18n.error.forbidden.message", "i18n.error.forbidden.title")
        val SEMESTER_OVERLAP = ValidationKey("i18n.modules.manage.semester.error.overlap", "i18n.error.input.title")
        val OUTSIDE_PARENT = ValidationKey("i18n.error.outsideParent.message", "i18n.error.outsideParent.title")

    }
}
