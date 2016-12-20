package outcobra.server.config

import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Configuration
import outcobra.server.filter.RequestAuthorizationFilter

@Configuration
open class AppConfig {

    private fun ApiRequestFilterRegistration(requestAuthorizationFilter: RequestAuthorizationFilter): FilterRegistrationBean {
        val filterRegistration = FilterRegistrationBean(requestAuthorizationFilter)
        filterRegistration.addUrlPatterns("/api/*")
        filterRegistration.setName("Request Authorization Filter")
        filterRegistration.order = 2

        return filterRegistration
    }
}