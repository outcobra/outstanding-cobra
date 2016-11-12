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
        private val LOGGER = LoggerFactory.getLogger(javaClass)
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
            if (request.method == RequestMethod.GET.name) {
                try {
                    val parentLink = extractFirstLink(normalizeUri(request.requestURI))
                    if (parentLink != null) {
                        authorizationService.verifyOwner(parentLink)
                    }
                } catch (e: NoParentFoundException) {
                    LOGGER.warn("No parent entity found for ${request.requestURI}")
                }
            }

            chain?.doFilter(request, response)

//            var userId = userService.getCurrentUser().userId
//            var method = request.method
//            var uri = normalizeUri(request.requestURI)
//            var type = uriObjectMapping[uri]
//            if (type != null) {
//                if (method.equals(RequestMethod.POST.name)) {
//                    var json = request.reader.readText()
//                    var entity = ObjectMapper().readValue(json, type).toEntity()
//                    if (!entity.verifyOwner(userId)) {
//                        LOGGER.warn("Dropping request '$request' because of ownership mismatch")
//                        destroy()
//                    } else {
//                        chain?.doFilter(request, response)
//                    }
//                } else if (method.equals(RequestMethod.GET) or method.equals(RequestMethod.DELETE)) {
//                    var repo = uriRepositoryMapping[uri]
//                    if (repo != null) {
//                        val id = extractParam(request.requestURI)
//                        when (id) {
//                            0L -> if (repo is InstitutionRepository && method.equals(RequestMethod.GET)) {
//                                chain?.doFilter(request, response)
//                            } else {
//                                LOGGER.warn("Dropping request '$request' because of unknown id")
//                                destroy()
//                            }
//                            -1L -> {
//                                destroy()
//                                LOGGER.warn("Dropping request '$request' because invalid GET Params")
//                            }
//                            else -> {
//                                repo.getOne(id)
//                                if (repo.getOne(id).verifyOwner(userId)) chain?.doFilter(request, response) else destroy()
//                            }
//                        }
//                    } else {
//                        LOGGER.warn("Dropping request '$request' because of unknown endpoint or entity")
//                        destroy()
//                    }
//                }
//            } else {
//                LOGGER.warn("Dropping request '$request' because of unknown endpoint or entity")
//                destroy()
//            }

        }
    }
}

