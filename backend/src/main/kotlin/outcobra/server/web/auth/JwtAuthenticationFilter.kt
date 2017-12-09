package outcobra.server.web.auth

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.GenericFilterBean
import outcobra.server.exception.ValidationKey
import outcobra.server.web.auth.exception.JwtTokenMissingException
import outcobra.server.web.auth.model.JwtAuthenticationToken
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import kotlin.reflect.full.cast

class JwtAuthenticationFilter(private val authenticationManager: AuthenticationManager,
                              private val objectMapper: ObjectMapper) : GenericFilterBean() {
    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        val resp = HttpServletResponse::class.cast(response)
        try {
            val header = (request!! as HttpServletRequest).getHeader("Authorization")

            if (header == null || !header.startsWith("Bearer")) {
                throw JwtTokenMissingException("No JWT token found in request headers")
            }

            val authToken = header.substring(7)

            val authRequest = JwtAuthenticationToken(authToken)

            val authentication = authenticationManager.authenticate(authRequest)
            SecurityContextHolder.getContext().authentication = authentication

            chain!!.doFilter(request, response)
        } catch (e: AuthenticationException) {
            resp.contentType = "application/json"
            resp.status = 403
            objectMapper.writeValue(response!!.writer, ValidationKey.FORBIDDEN.makeException(nestedCause = e))
        }
    }
}