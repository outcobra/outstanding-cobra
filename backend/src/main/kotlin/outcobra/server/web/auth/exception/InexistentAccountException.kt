package outcobra.server.web.auth.exception

import org.springframework.security.core.AuthenticationException

class InexistentAccountException : AuthenticationException("The requested user does not exist")