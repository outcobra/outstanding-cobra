package outcobra.server.web.auth.exception

class JwtTokenMissingException(override val message: String?) : Exception(message)