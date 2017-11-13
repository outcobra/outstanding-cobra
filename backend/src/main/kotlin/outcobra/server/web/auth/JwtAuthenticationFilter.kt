package outcobra.server.web.auth

import me.mkweb.releasr.web.auth.exception.JwtTokenMissingException
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.GenericFilterBean
import outcobra.server.web.auth.model.JwtAuthenticationToken
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

class JwtAuthenticationFilter(private val authenticationManager: AuthenticationManager) : GenericFilterBean() {
    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        val header = (request!! as HttpServletRequest).getHeader("Authorization")

        if (header == null || !header.startsWith("Bearer ")) {
            throw JwtTokenMissingException("No JWT token found in request headers")
        }

        val authToken = header.substring(7)

        val authRequest = JwtAuthenticationToken(authToken)

        val authentication = authenticationManager.authenticate(authRequest)
        SecurityContextHolder.getContext().authentication = authentication

        chain!!.doFilter(request, response)
        SecurityContextHolder.getContext().authentication = null
    }
}