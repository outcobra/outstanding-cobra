package outcobra.server.web.auth

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.GenericFilterBean
import outcobra.server.web.auth.model.JwtAuthenticationToken
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

class JwtAuthenticationFilter : GenericFilterBean() {
    private val HEADER_PREFIX = "Bearer"

    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        val header = (request!! as HttpServletRequest).getHeader("Authorization")

        if (header != null && header.startsWith(HEADER_PREFIX)) {
            val authToken = header.removePrefix(HEADER_PREFIX).trim()

            SecurityContextHolder.getContext().authentication = JwtAuthenticationToken(authToken)
        }

        chain!!.doFilter(request, response)
    }
}