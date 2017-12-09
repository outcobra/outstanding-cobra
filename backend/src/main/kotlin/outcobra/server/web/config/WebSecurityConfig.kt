package outcobra.server.web.config

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.boot.autoconfigure.security.SecurityProperties
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.core.env.Environment
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import outcobra.server.config.ProfileRegistry
import outcobra.server.web.auth.JwtAuthenticationFilter
import outcobra.server.web.auth.JwtAuthenticationProvider
import javax.inject.Inject


/**
 * WebSecurityConfig which is active all the time but can be overridden
 *
 * @author Mario Kunz
 * @since 1.1.0
 */
@Configuration
@EnableWebSecurity
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER + 1)
class WebSecurityConfig
@Inject constructor(val environment: Environment,
                    val objectMapper: ObjectMapper,
                    val jwtAuthenticationProvider: JwtAuthenticationProvider) : WebSecurityConfigurerAdapter() {

    override fun configure(web: WebSecurity?) {
        if (environment.acceptsProfiles(ProfileRegistry.DEVELOPMENT)) {
            web!!.ignoring().antMatchers("/h2-console/**", "/api/auth/**", "/api/user/emailAvailable/*")
                    .antMatchers(HttpMethod.OPTIONS)
        }
    }

    override fun configure(http: HttpSecurity?) {
        http!!.headers().frameOptions().disable()
        http.csrf().disable()
        http.cors().disable()

        http.authorizeRequests().antMatchers("/api/auth/**").permitAll()

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
                            "/trace",
                            "/configprops",
                            "/api/ping").permitAll()
                    .anyRequest().permitAll()
        } else if (environment.acceptsProfiles(ProfileRegistry.PRODUCTION)) {
            http.authorizeRequests()
                    .antMatchers("/api/ping").permitAll()
                    .anyRequest().authenticated()
        }

        if (!environment.acceptsProfiles(ProfileRegistry.BASIC_AUTH_SECURITY_MOCK)) {
            http.addFilterBefore(JwtAuthenticationFilter(authenticationManager(), objectMapper), UsernamePasswordAuthenticationFilter::class.java)
        }
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth!!.authenticationProvider(jwtAuthenticationProvider)
    }


}