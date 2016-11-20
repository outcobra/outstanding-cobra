package outcobra.server.config

import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import outcobra.server.filter.RequestAuthorizationFilter
import javax.inject.Inject

@Configuration
open class AppConfig {
    @Bean @Inject
    open fun ApiRequestFilterRegistration(requestAuthorizationFilter: RequestAuthorizationFilter): FilterRegistrationBean {
        val filterRegistration = FilterRegistrationBean(requestAuthorizationFilter)
        filterRegistration.addUrlPatterns("/api/*")
        filterRegistration.setName("Request Authorization Filter")
        filterRegistration.order = 2

        return filterRegistration
    }
}