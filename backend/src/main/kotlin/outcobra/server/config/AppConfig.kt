package outcobra.server.config

import org.slf4j.LoggerFactory
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import outcobra.server.filter.RequestAuthorizationFilter
import outcobra.server.util.ProfileRegistry.Companion.DISABLE_AUTH_FILTER
import javax.inject.Inject

@Configuration
open class AppConfig {
    companion object {
        private val LOGGER = LoggerFactory.getLogger(AppConfig::class.java)
    }

    @Bean @Inject @Profile("!$DISABLE_AUTH_FILTER")
    open fun ApiRequestFilterRegistration(requestAuthorizationFilter: RequestAuthorizationFilter): FilterRegistrationBean {
        LOGGER.info("Registering RequestAuthorizationFilter")

        val filterRegistration = FilterRegistrationBean(requestAuthorizationFilter)
        filterRegistration.addUrlPatterns("/api/*")
        filterRegistration.setName("Request Authorization Filter")
        filterRegistration.order = 2

        return filterRegistration
    }
}