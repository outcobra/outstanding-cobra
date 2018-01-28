package outcobra.server.web.auth.config

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK

@Configuration
class AuthConfig {
    companion object {
        @Bean
        @Profile("!$BASIC_AUTH_SECURITY_MOCK")
        @JvmStatic
        fun idTokenVerifier(@Value("\${security.google.clientId}") clientId: String): GoogleIdTokenVerifier =
                GoogleIdTokenVerifier.Builder(NetHttpTransport(), JacksonFactory())
                        .setAudience(listOf(clientId))
                        .build()
    }
}