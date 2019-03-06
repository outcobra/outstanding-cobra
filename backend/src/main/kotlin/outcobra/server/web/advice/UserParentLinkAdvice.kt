package outcobra.server.web.advice

import org.springframework.core.MethodParameter
import org.springframework.http.HttpInputMessage
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdviceAdapter
import outcobra.server.model.interfaces.UserParentLinkedDto
import outcobra.server.service.UserService
import java.lang.reflect.Type

@ControllerAdvice
class UserParentLinkAdvice(val userService: UserService) : RequestBodyAdviceAdapter() {
    override fun afterBodyRead(body: Any?, inputMessage: HttpInputMessage?,
                               parameter: MethodParameter?,
                               targetType: Type?,
                               converterType: Class<out HttpMessageConverter<*>>?): Any? {
        if (body is UserParentLinkedDto) {
            body.userId = userService.getCurrentUser().id
        }
        return body
    }

    override fun supports(methodParameter: MethodParameter?,
                          targetType: Type,
                          converterType: Class<out HttpMessageConverter<*>>?): Boolean {
        if (targetType is Class<*>) {
            return targetType.interfaces
                    .any { it == UserParentLinkedDto::class.java }
        }
        return false
    }
}