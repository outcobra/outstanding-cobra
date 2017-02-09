package outcobra.server.config

import org.springframework.boot.autoconfigure.security.SecurityProperties
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.core.env.Environment
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import javax.inject.Inject

/**
 * @author Mario Kunz
 * @since <since>
 */
@Configuration
@EnableWebSecurity
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER - 1)
open class WebSecurityConfig
@Inject constructor(val environment: Environment) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity?) {
        http!!.headers().frameOptions().disable()

        //TODO discuss what needs to be active on which profile
        if (environment.acceptsProfiles(ProfileRegistry.DEVELOPMENT)) {
            http.authorizeRequests()
                    .antMatchers("/swagger-ui.html",
                            "/webjars/springfox-swagger-ui/**",
                            "/swagger-resources/**",
                            "/v2/api-docs",
                            "/h2-console/**",
                            "/env",
                            "/health",
                            "/info",
                            "/api/ping").permitAll()
                    .anyRequest().authenticated()

        } else if (environment.acceptsProfiles(ProfileRegistry.PRODUCTION)) {
            http.authorizeRequests()
                    .antMatchers("/api/ping").permitAll()
                    .anyRequest().authenticated()
        }
    }
}