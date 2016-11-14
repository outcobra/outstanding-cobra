package outcobra.server.filter

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.filter.GenericFilterBean
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.AuthorizationService
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
        private val URI_PUTPOST_RESOURCE_EXTRACTING_PATTERN = Pattern.compile("^api/([^/]+)/?.*")
    }

    private fun normalizeUri(uri: String): String {
        val matcher = URI_NORMALIZING_PATTERN.matcher(uri)
        if (!matcher.matches()) return ""
        return matcher.group(1)
    }

    private fun getEntityName(uri: String): String {
        val matcher = URI_PUTPOST_RESOURCE_EXTRACTING_PATTERN.matcher(uri)
        if (!matcher.matches()) return ""
        return matcher.group(1)
    }

    private fun extractFirstEntity(uri: String): ParentLinked? {
        val matcher = URI_RESOURCE_EXTRACTING_PATTERN.matcher(uri)
        if (!matcher.matches()) return null

        return authorizationService.getParentLinkedEntityOf(matcher.group(2).toLong(), matcher.group(1))
    }

    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        if (request is HttpServletRequest) {
            // Get 1 && Get all
            if (request.method == RequestMethod.GET.name) {
                try {
                    val parentLinked = extractFirstEntity(normalizeUri(request.requestURI))
                    if (parentLinked == null || !authorizationService.verifyOwner(parentLinked)) {
                        LOGGER.warn("Dropping request to ${request.requestURI} because of owner mismatch or missing parent link ($parentLinked)")
                        return destroy()
                    }
                } catch (e: Exception) {
                    LOGGER.error("some exception", e)
                }
                // Update and create
            } else if (request.method in arrayOf(RequestMethod.POST.name, RequestMethod.PUT.name)) {
                val dtoText = request.reader.readText()
                val entityName = getEntityName(normalizeUri(request.requestURI))
                if (!authorizationService.verifyDto(dtoText, entityName, request.method == RequestMethod.PUT.name)) {
                    LOGGER.warn("Dropping request to ${request.requestURI} because of ownership mismatch")
                    return destroy()
                }
            }
            chain?.doFilter(request, response)
        }
    }
}