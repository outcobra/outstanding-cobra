package outcobra.server.filter

import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.filter.GenericFilterBean
import outcobra.server.config.ProfileRegistry
import outcobra.server.model.interfaces.ParentLinked
import outcobra.server.service.AuthorizationService
import java.util.regex.Pattern
import javax.inject.Inject
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.validation.ValidationException

/**
 * A filter used to validate requests to the outcobra api
 * currently deactivated
 * @author Joel Messerli
 * @since
 */
@Profile("!${ProfileRegistry.DISABLE_AUTH_FILTER}")
@Component
open class RequestAuthorizationFilter @Inject constructor(val authorizationService: AuthorizationService) : GenericFilterBean() {
    // companion object is the kotlin equivalent to javas static instance fields
    companion object {
        /**
         * An object used to print log messages
         * @see LOGGER
         */
        private val LOGGER = LoggerFactory.getLogger(RequestAuthorizationFilter::class.java)
        /**
         * The fallowing three instance fields are [Pattern]s to extract data from the request url
         */
        private val URI_NORMALIZING_PATTERN = Pattern.compile("^/?(.*?)/?$")
        private val URI_RESOURCE_EXTRACTING_PATTERN = Pattern.compile("^api/([^/]+)/(\\d+)(/.*)?")
        private val URI_PUT_POST_RESOURCE_EXTRACTING_PATTERN = Pattern.compile("^api/([^/]+)/?.*")

        /**
         * requests to the following endpoints do not need to be validated
         */
        private val IGNORED_URIS = listOf(
                "api/manage",
                "api/user/login"
        )
    }

    private fun normalizeUri(uri: String): String {
        val matcher = URI_NORMALIZING_PATTERN.matcher(uri)
        if (!matcher.matches()) return ""
        return matcher.group(1)
    }

    private fun getEntityName(uri: String): String {
        val matcher = URI_PUT_POST_RESOURCE_EXTRACTING_PATTERN.matcher(uri)
        if (!matcher.matches()) return ""
        return matcher.group(1)
    }

    private fun extractFirstEntity(uri: String): ParentLinked? {
        val matcher = URI_RESOURCE_EXTRACTING_PATTERN.matcher(uri)
        if (!matcher.matches()) return null

        return authorizationService.getParentLinkedEntityOf(matcher.group(2).toLong(), matcher.group(1))
    }

    /**
     * This function is called every time someone makes a request to our api
     * It tries to validate the request and drop it if something is not right.
     * e.g. if the ownership of the given object does not match the current user
     */
    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        if (request is HttpServletRequest) {
            val wrappedRequest: RequestWrapper = RequestWrapper(request)
            val normalizedUri = normalizeUri(wrappedRequest.requestURI)

            // Get 1 && Get all
            if (normalizedUri !in IGNORED_URIS) {
                if (wrappedRequest.method == RequestMethod.GET.name) {
                    try {
                        val parentLinked = extractFirstEntity(normalizedUri)
                        if (parentLinked == null || !authorizationService.verifyOwner(parentLinked)) {
                            LOGGER.warn("Dropping request to ${wrappedRequest.requestURI} because of owner mismatch or missing parent link ($parentLinked)")
                            return destroy()
                        }
                    } catch (e: ValidationException) {
                        LOGGER.error("Could not validate request to ${wrappedRequest.requestURI}", e)
                        return destroy()
                    }
                    // Update and create
                } else if (wrappedRequest.method in arrayOf(RequestMethod.POST.name, RequestMethod.PUT.name)) {
                    val dtoText = wrappedRequest.reader.readText()
                    val entityName = getEntityName(normalizedUri)
                    if (!authorizationService.verifyDto(dtoText, entityName, wrappedRequest.method == RequestMethod.PUT.name)) {
                        LOGGER.warn("Dropping request to ${wrappedRequest.requestURI} because of ownership mismatch")
                        return destroy()
                    }
                }
            } else {
                LOGGER.info("Directly passing request to ${wrappedRequest.requestURI} because it's on the ignore list")
            }
            chain!!.doFilter(wrappedRequest, response)
        }
    }
}