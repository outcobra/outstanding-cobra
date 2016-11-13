package outcobra.server.filter

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.filter.GenericFilterBean
import outcobra.server.model.interfaces.ParentLink
import outcobra.server.service.AuthorizationService
import outcobra.server.service.internal.NoParentFoundException
import java.util.regex.Pattern
import javax.inject.Inject
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

@Component
open class RequestAuthorizationFilter @Inject constructor(val authorizationService: AuthorizationService) : GenericFilterBean() {
    companion object {
        private val LOGGER = LoggerFactory.getLogger(RequestAuthorizationFilter::class.java)
        private val URI_NORMALIZING_PATTERN = Pattern.compile("^/?(.*?)/?$")
        private val URI_RESOURCE_EXTRACTING_PATTERN = Pattern.compile("^api/([^/]+)/(\\d+)(/.*)?")
    }

    private fun normalizeUri(uri: String): String {
        val matcher = URI_NORMALIZING_PATTERN.matcher(uri)
        if (!matcher.matches()) return ""
        else return matcher.group(1)
    }

    private fun extractFirstLink(uri: String): ParentLink<*>? {
        val matcher = URI_RESOURCE_EXTRACTING_PATTERN.matcher(uri)
        if (!matcher.matches()) return null

        return authorizationService.parentLinkOf(matcher.group(2).toLong(), matcher.group(1))
    }

    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        if (request is HttpServletRequest) {
            // Get 1 && Get all
            if (request.method == RequestMethod.GET.name) {
                try {
                    val parentLink = extractFirstLink(normalizeUri(request.requestURI))
                    if (parentLink == null || !authorizationService.verifyOwner(parentLink)) {
                        LOGGER.warn("Dropping request to ${request.requestURI} because of owner mismatch or missing parent link ($parentLink)")
                        return destroy()
                    }
                } catch (e: NoParentFoundException) {
                    LOGGER.warn("No parent entity found for ${request.requestURI}")
                }
                // Save and create
            } else if (request.method in arrayOf(RequestMethod.POST.name, RequestMethod.PUT.name)) {
                // this is shit
            }

            chain?.doFilter(request, response)
        }
    }
}