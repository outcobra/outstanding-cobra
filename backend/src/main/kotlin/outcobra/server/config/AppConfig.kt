package outcobra.server.config

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer
import org.springframework.core.io.ClassPathResource
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK


@Configuration
class AppConfig {
    companion object {
        @Bean @Profile("!$BASIC_AUTH_SECURITY_MOCK") @JvmStatic
        fun getAuthConfigs(): PropertySourcesPlaceholderConfigurer {
            val configurer = PropertySourcesPlaceholderConfigurer()
            val yaml = YamlPropertiesFactoryBean()
            yaml.setResources(ClassPathResource("auth.yml"))
            configurer.setProperties(yaml.`object`)
            return configurer
        }

        @Bean @Profile("!$BASIC_AUTH_SECURITY_MOCK") @JvmStatic
        fun passwordEncoder() = BCryptPasswordEncoder()
    }
}