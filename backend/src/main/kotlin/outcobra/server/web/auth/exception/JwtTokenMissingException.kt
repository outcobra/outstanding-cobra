package outcobra.server.web.auth.exception

import org.springframework.security.core.AuthenticationException

class JwtTokenMissingException(override val message: String?) : AuthenticationException(message)