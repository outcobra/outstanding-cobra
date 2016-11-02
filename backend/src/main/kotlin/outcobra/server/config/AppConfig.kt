package outcobra.server.config
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import outcobra.server.filter.RequestAuthorizationFilter
import javax.servlet.Filter

/**
 * Created by bbuerf on 01.11.2016.
 */
@Configuration
final class AppConfig {
    @Bean
    fun ApiRequestFilterRegistration() {
        var registration = FilterRegistrationBean()
        registration.addUrlPatterns("/api/*")
        registration.setName("RequestAuthorization")
        registration.order=2
        registration.filter = requestAuthorizationFilter()
    }

    @Bean
    fun requestAuthorizationFilter(): Filter {
        return RequestAuthorizationFilter()
    }
}