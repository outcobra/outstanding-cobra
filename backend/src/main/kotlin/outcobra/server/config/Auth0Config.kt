package outcobra.server.config

import com.auth0.Auth0
import com.auth0.authentication.AuthenticationAPIClient
import com.auth0.authentication.result.UserProfile
import com.auth0.spring.security.api.Auth0JWTToken
import com.auth0.spring.security.api.Auth0SecurityConfig
import org.springframework.boot.autoconfigure.security.SecurityProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.core.annotation.Order
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK

@Profile("!$BASIC_AUTH_SECURITY_MOCK")
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
open class Auth0Config : Auth0SecurityConfig() {
    @Bean open fun auth0Client(): Auth0Client {
        return Auth0Client(clientId, issuer)
    }
}

class Auth0Client(val clientId: String, val domain: String, val auth0: Auth0 = Auth0(clientId, domain), val client: AuthenticationAPIClient = auth0.newAuthenticationAPIClient()) {
    fun getUserProfile(token: Auth0JWTToken): UserProfile = client.tokenInfo(token.jwt).execute()
}