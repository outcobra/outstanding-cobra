package outcobra.server.config

import com.fasterxml.jackson.datatype.jdk8.Jdk8Module
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import outcobra.server.filter.RequestAuthorizationFilter

@Configuration
open class AppConfig {

    @Bean
    @Primary
    open fun jacksonBuilder(): Jackson2ObjectMapperBuilder {
        val builder = Jackson2ObjectMapperBuilder()

        builder.modules(JavaTimeModule(),
                Jdk8Module(),
                ParameterNamesModule(),
                KotlinModule())

        return builder
    }

    private fun ApiRequestFilterRegistration(requestAuthorizationFilter: RequestAuthorizationFilter): FilterRegistrationBean {
        val filterRegistration = FilterRegistrationBean(requestAuthorizationFilter)
        filterRegistration.addUrlPatterns("/api/*")
        filterRegistration.setName("Request Authorization Filter")
        filterRegistration.order = 2

        return filterRegistration
    }
}