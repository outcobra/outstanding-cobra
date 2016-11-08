package outcobra.server.filter

import com.fasterxml.jackson.databind.ObjectMapper
import org.slf4j.LoggerFactory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.filter.GenericFilterBean
import outcobra.server.model.OwnerVerifiable
import outcobra.server.model.dto.emptyDto.InstitutionDto
import outcobra.server.model.dto.emptyDto.SchoolClassDto
import outcobra.server.model.dto.emptyDto.TeacherDto
import outcobra.server.model.mapper.MappableDto
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.service.UserService
import java.util.*
import java.util.regex.Pattern
import javax.inject.Inject
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest


@Component
open class RequestAuthorizationFilter @Inject constructor(val userService: UserService,
                                                          institutionRepository: InstitutionRepository,
                                                          schoolClassRepository: SchoolClassRepository) : GenericFilterBean() {
    private val LOGGER = LoggerFactory.getLogger(javaClass)
    var uriObjectMapping = HashMap<String, Class<out MappableDto<*, out OwnerVerifiable>>>()
    var uriRepositoryMapping = HashMap<String, JpaRepository<out OwnerVerifiable, Long>>()

    init {
        //uriObjectMapping.put("api/user", UserDto::class.java)
        uriObjectMapping.put("api/institution", InstitutionDto::class.java)
        uriObjectMapping.put("api/class", SchoolClassDto::class.java)
        uriObjectMapping.put("api/teacher", TeacherDto::class.java)

        uriRepositoryMapping.put("api/institution", institutionRepository)
        uriRepositoryMapping.put("api/class", schoolClassRepository)

    }

    private val uriPattern = Pattern.compile("^/?(.*?)/?$")
    private val paramPattern = Pattern.compile("api/(.*?)/(\\d+).*")
    private val idPattern = Pattern.compile("/\\d+")


    private fun normalizeUri(uri: String): String {
        val matcher = uriPattern.matcher(uri)
        if (!matcher.matches()) return ""
        else return matcher.group(1)
    }

    private fun extractParam(uri: String): Long {
        val matcher = paramPattern.matcher(uri)
        if (!matcher.matches()) return -1
        else {
            var pathParam = matcher.group(1)
            val idMatcher = idPattern.matcher(pathParam)
            if (!idMatcher.matches()) return 0
            else {
                return idMatcher.group(1).substring(1).toLong()
            }
        }
    }

    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        if (request is HttpServletRequest) {
            var userId = userService.getCurrentUser().userId
            var method = request.method
            var uri = normalizeUri(request.requestURI)
            var type = uriObjectMapping[uri]
            if (type != null) {
                if (method.equals(RequestMethod.POST)) {
                    var json = request.reader.readText()
                    var entity = ObjectMapper().readValue(json, type).toEntity()
                    if (!entity.verifyOwner(userId)) {
                        LOGGER.warn("Dropping request '$request' because of ownership mismatch")
                        destroy()
                    } else {
                        chain?.doFilter(request, response)
                    }
                } else if (method.equals(RequestMethod.GET) or method.equals(RequestMethod.DELETE)) {
                    var repo = uriRepositoryMapping[uri]
                    if (repo != null) {
                        val id = extractParam(request.requestURI)
                        when (id) {
                            0L -> if (repo is InstitutionRepository && method.equals(RequestMethod.GET)) {
                                chain?.doFilter(request, response)
                            } else {
                                LOGGER.warn("Dropping request '$request' because of unknown id")
                                destroy()
                            }
                            -1L -> {
                                destroy()
                                LOGGER.warn("Dropping request '$request' because invalid GET Params")
                            }
                            else -> {
                                repo.getOne(id)
                                if (repo.getOne(id).verifyOwner(userId)) chain?.doFilter(request, response) else destroy()
                            }
                        }
                    } else {
                        LOGGER.warn("Dropping request '$request' because of unknown endpoint or entity")
                        destroy()
                    }
                }
            } else {
                LOGGER.warn("Dropping request '$request' because of unknown endpoint or entity")
                destroy()
            }

        }
    }
}

