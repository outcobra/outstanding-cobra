package outcobra.server.config

import io.sentry.spring.SentryExceptionResolver
import io.sentry.spring.SentryServletContextInitializer
import org.springframework.beans.factory.config.YamlPropertiesFactoryBean
import org.springframework.boot.web.servlet.ServletContextInitializer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer
import org.springframework.core.io.ClassPathResource
import org.springframework.web.servlet.HandlerExceptionResolver
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import outcobra.server.config.ProfileRegistry.Companion.DISABLE_SENTRY

@Configuration
class AppConfig {
    companion object {
        @Bean
        @Profile("!$BASIC_AUTH_SECURITY_MOCK")
        fun getAuth0Config(): PropertySourcesPlaceholderConfigurer {
            val configurer = PropertySourcesPlaceholderConfigurer()
            val yaml = YamlPropertiesFactoryBean()
            yaml.setResources(ClassPathResource("auth0.yml"))
            configurer.setProperties(yaml.`object`)
            return configurer
        }

        @Bean
        @Profile("!$DISABLE_SENTRY")
        fun sentryExceptionResolver(): HandlerExceptionResolver = SentryExceptionResolver()

        @Bean
        @Profile("!$DISABLE_SENTRY")
        fun sentryServletContextInitializer(): ServletContextInitializer = SentryServletContextInitializer()
    }

}