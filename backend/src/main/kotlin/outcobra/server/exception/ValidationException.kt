package outcobra.server.exception

/**
 * A generic exception to throw if you want it to be displayed on the frontend
 * @author Florian Bürgi
 * @since <since>
 */
class ValidationException(var title: String = "i18n.error.generic.title",
                          override val message: String = "i18n.error.generic.message",
                          var messageLevel: MessageLevel = MessageLevel.ERROR,
                          override var cause: Throwable? = null) : RuntimeException() {

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other?.javaClass != javaClass) return false

        other as ValidationException

        if (title != other.title) return false
        if (messageLevel != other.messageLevel) return false
        if (message != other.message) return false
        if (cause != other.cause) return false

        return true
    }

    override fun hashCode(): Int {
        var result = title.hashCode()
        result = 31 * result + messageLevel.hashCode()
        result = 31 * result + message.hashCode()
        result = 31 * result + (cause?.hashCode() ?: 0)
        return result
    }

    @Throws(ValidationException::class)
    fun throwException(): Nothing {
        throw(this)
    }
}