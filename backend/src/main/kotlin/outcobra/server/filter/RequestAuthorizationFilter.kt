package outcobra.server.filter

import com.fasterxml.jackson.databind.ObjectMapper
import noutcobra.server.model.mapper.MappableDto
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.filter.GenericFilterBean
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.dto.TeacherDto
import outcobra.server.model.marker.OwnerVerifiable
import outcobra.server.service.UserService
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest


/**
 * Created by bbuerf on 01.11.2016.
 */
@Component
open class RequestAuthorizationFilter : GenericFilterBean() {
    private val LOGGER = LoggerFactory.getLogger(javaClass)
    var endpointObjectMapping = HashMap<String, Class<out MappableDto<*, out OwnerVerifiable>>>()

    @Autowired
    lateinit var userService: UserService

    init {
        //endpointObjectMapping.put("api/user", UserDto::class.java)
        endpointObjectMapping.put("api/institution", InstitutionDto::class.java)
        endpointObjectMapping.put("api/class", SchoolClassDto::class.java)
        endpointObjectMapping.put("api/teacher", TeacherDto::class.java)
    }

    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        if (request is HttpServletRequest) {
            var userId = userService.getCurrentUser().userId
            var method = request.method
            var type = endpointObjectMapping.get(request.requestURI)
            if (method.equals(RequestMethod.POST)) {
                var json = request.reader.readText()
                var entity = ObjectMapper().readValue(json, type).toEntity()
                if (!entity.verifyOwner(userId)) {
                    LOGGER.warn("Dropping request '$request' because of ownership mismatch")
                    destroy()
                } else {
                    chain?.doFilter(request, response)
                }
            } else if (method.equals(RequestMethod.GET)) {
                request.parameterNames.toList().filter { it.contains("id") }.forEach {
                    request.getParameter(it)

                }
            } else if (method.equals(RequestMethod.DELETE)) {
                request.parameterNames.toList().filter { it.contains("id") }.forEach { }
            }


        }
    }
}

