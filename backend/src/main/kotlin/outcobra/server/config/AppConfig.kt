package outcobra.server.config

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer
import org.springframework.core.io.ClassPathResource
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import outcobra.server.config.ProfileRegistry.Companion.DISABLE_AUTH_FILTER
import outcobra.server.filter.RequestAuthorizationFilter
import outcobra.server.service.internal.DefaultAuthorizationService.Companion.LOGGER
import javax.inject.Inject

@Configuration
open class AppConfig {

    @Bean @Profile("!$BASIC_AUTH_SECURITY_MOCK")
    open fun getAuth0Config(): PropertySourcesPlaceholderConfigurer {
        val configurer = PropertySourcesPlaceholderConfigurer()
        val yaml = YamlPropertiesFactoryBean()
        yaml.setResources(ClassPathResource("auth0.yml"))
        configurer.setProperties(yaml.`object`) // cringe?
        return configurer
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