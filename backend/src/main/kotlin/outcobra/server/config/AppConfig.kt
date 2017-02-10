package outcobra.server.config

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer
import org.springframework.core.io.ClassPathResource
import outcobra.server.filter.RequestAuthorizationFilter

@Configuration
open class AppConfig {

    @Bean
    open fun getAuth0Config(): PropertySourcesPlaceholderConfigurer {
        val configurer = PropertySourcesPlaceholderConfigurer()
        val yaml = YamlPropertiesFactoryBean()
        yaml.setResources(ClassPathResource("auth0.yml"))
        configurer.setProperties(yaml.`object`) // cringe?
        return configurer
    }

    private fun ApiRequestFilterRegistration(requestAuthorizationFilter: RequestAuthorizationFilter): FilterRegistrationBean {
        val filterRegistration = FilterRegistrationBean(requestAuthorizationFilter)
        filterRegistration.addUrlPatterns("/api/*")
        filterRegistration.setName("Request Authorization Filter")
        filterRegistration.order = 2

        return filterRegistration
    }
}