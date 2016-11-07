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
        var registration = FilterRegistrationBean()
        registration.addUrlPatterns("/api/*")
        registration.setName("RequestAuthorization")
        registration.order = 2
        registration.filter = requestAuthorizationFilter
        return registration
    }
}