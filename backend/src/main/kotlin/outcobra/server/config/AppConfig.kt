package outcobra.server.config

import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import outcobra.server.filter.RequestAuthorizationFilter

/**
 * Created by bbuerf on 01.11.2016.
 */
@Configuration
final class AppConfig {
    @Bean
    fun ApiRequestFilterRegistration(): FilterRegistrationBean {
        var registration = FilterRegistrationBean()
        registration.addUrlPatterns("/api/*")
        registration.setName("RequestAuthorization")
        registration.order = 2
        registration.filter = RequestAuthorizationFilter()
        return registration
    }
}