package me.mkweb.releasr.web.auth.exception

import org.springframework.security.core.AuthenticationException

class JwtTokenMalformedException(override val message: String?) : AuthenticationException(message)