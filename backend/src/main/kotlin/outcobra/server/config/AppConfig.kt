package outcobra.server.config

import org.springframework.boot.web.servlet.FilterRegistrationBean
import outcobra.server.filter.RequestAuthorizationFilter

open class AppConfig {
    open fun ApiRequestFilterRegistration(requestAuthorizationFilter: RequestAuthorizationFilter): FilterRegistrationBean {
        val filterRegistration = FilterRegistrationBean(requestAuthorizationFilter)
        filterRegistration.addUrlPatterns("/api/*")
        filterRegistration.setName("Request Authorization Filter")
        filterRegistration.order = 2

        return filterRegistration
    }
}