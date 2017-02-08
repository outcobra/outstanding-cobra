package outcobra.server.filter

import org.springframework.stereotype.Component
import org.springframework.web.filter.GenericFilterBean
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Component
open class RequestWrappingFilter : GenericFilterBean() {
    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        val currentRequest = request as HttpServletRequest
        val wrappedRequest = RequestWrapper(currentRequest)
        chain!!.doFilter(wrappedRequest, response)
    }
}