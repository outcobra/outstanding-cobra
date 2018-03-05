package outcobra.server.config

import org.springframework.beans.factory.config.YamlProcessor.ResolutionMethod.FIRST_FOUND
import org.springframework.beans.factory.config.YamlPropertiesFactoryBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.FileSystemResource
import org.springframework.http.HttpHeaders
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import outcobra.server.config.ProfileRegistry.Companion.DEVELOPMENT
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.service.ApiKey
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket


@Configuration
class AppConfig {
    companion object {
        @Bean
        @Profile("!$BASIC_AUTH_SECURITY_MOCK")
        @JvmStatic
        fun getAuthConfigs(): PropertySourcesPlaceholderConfigurer {
            val configurer = PropertySourcesPlaceholderConfigurer()
            val yaml = YamlPropertiesFactoryBean()
            yaml.setResolutionMethod(FIRST_FOUND)
            yaml.setResources(FileSystemResource("./config/auth.yml"), ClassPathResource("auth.yml"))
            configurer.setProperties(yaml.`object`)
            return configurer
        }

        @Bean
        @Profile("!$BASIC_AUTH_SECURITY_MOCK")
        @JvmStatic
        fun passwordEncoder() = BCryptPasswordEncoder()


        @Bean
        @JvmStatic
        @Profile(DEVELOPMENT)
        fun api(): Docket {
            return Docket(DocumentationType.SWAGGER_2)
                    .select()
                    .apis(RequestHandlerSelectors.basePackage("outcobra.server.web.controller"))
                    .paths(PathSelectors.any())
                    .build()
                    .securitySchemes(listOf(ApiKey("KEY MATE", HttpHeaders.AUTHORIZATION, "header")))
        }
    }
}