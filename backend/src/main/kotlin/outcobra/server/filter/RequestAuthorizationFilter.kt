package outcobra.server.filter

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.web.filter.GenericFilterBean
import outcobra.server.model.Institution
import outcobra.server.model.Teacher
import outcobra.server.model.User
import outcobra.server.service.AuthorizationService
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
    @Autowired
    lateinit var authorizationService: AuthorizationService
    var endpointObjectMapping = HashMap<String, Class<out Any>>()

    init {
        endpointObjectMapping.put("api/user", User::class.java)
        endpointObjectMapping.put("api/institution", Institution::class.java)
//        endpointObjectMapping.put("api/class", SchoolClass::class)
//        endpointObjectMapping.put("api/teacher", Teacher::class)
    }

    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        if (request is HttpServletRequest) {
            var type = endpointObjectMapping["api/user"]
            var objectMapper = ObjectMapper()
            var json = request.reader.readText()
            var entity = objectMapper.readValue(json, type)
            if (!verifyOwnership(entity)) {
                println("message will be dismissed")
                destroy()
            } else {
                chain?.doFilter(request, response)
            }
        }
    }

    fun verifyOwnership(entity: Any): Boolean {
        return when (entity) {
            is User -> authorizationService.verifyOwner(entity)
            is Institution -> authorizationService.verifyOwner(entity)
            is Teacher -> authorizationService.verifyOwner(entity)
            else -> false
        }
    }
}

