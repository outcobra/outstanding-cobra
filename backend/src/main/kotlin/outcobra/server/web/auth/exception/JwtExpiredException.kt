package outcobra.server.web.auth.exception

import org.springframework.security.core.AuthenticationException
import java.time.LocalDateTime

class JwtExpiredException(expirationTime: LocalDateTime) : AuthenticationException("The JWT has been expired: $expirationTime")