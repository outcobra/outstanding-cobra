package outcobra.server.config

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer
import org.springframework.core.io.ClassPathResource
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK


@Configuration
class AppConfig {
    companion object {
        @Bean @Profile("!$BASIC_AUTH_SECURITY_MOCK") @JvmStatic
        fun getAuth0Config(): PropertySourcesPlaceholderConfigurer {
            val configurer = PropertySourcesPlaceholderConfigurer()
            val yaml = YamlPropertiesFactoryBean()
            yaml.setResources(ClassPathResource("auth0.yml"))
            configurer.setProperties(yaml.`object`) // cringe?
            return configurer
        }
    }

}