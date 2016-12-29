package outcobra.server.config

import com.auth0.Auth0
import com.auth0.authentication.AuthenticationAPIClient
import com.auth0.authentication.result.UserProfile
import com.auth0.spring.security.api.Auth0JWTToken
import com.auth0.spring.security.api.Auth0SecurityConfig
import org.springframework.boot.autoconfigure.security.SecurityProperties
import org.springframework.context.annotation.Bean
import org.springframework.core.annotation.Order
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
open class AuthConfig : Auth0SecurityConfig() {

    @Bean open fun auth0Client(): Auth0Client {
        return Auth0Client(clientId, issuer)
    }

    override fun authorizeRequests(http: HttpSecurity?) {
        http!!.headers().frameOptions().disable()

        http.authorizeRequests()
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/webjars/springfox-swagger-ui/**").permitAll()
                .antMatchers("/swagger-resources/**").permitAll()
                .antMatchers("/v2/api-docs").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .anyRequest().authenticated()
    }
}

class Auth0Client(val clientId: String, val domain: String, val auth0: Auth0 = Auth0(clientId, domain), val client: AuthenticationAPIClient = auth0.newAuthenticationAPIClient()) {

    fun getUserProfile(token: Auth0JWTToken): UserProfile = client.tokenInfo(token.jwt).execute()
}