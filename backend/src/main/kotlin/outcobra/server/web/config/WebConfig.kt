package outcobra.server.web.config

import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
import outcobra.server.config.ProfileRegistry


@Configuration
class WebConfig(val environment: Environment) : WebMvcConfigurerAdapter() {
    override fun addCorsMappings(registry: CorsRegistry?) {
        if (environment.acceptsProfiles(ProfileRegistry.DEVELOPMENT)) {
            registry!!.addMapping("/**/*")
                    .allowedOrigins("*")
        }
    }
}