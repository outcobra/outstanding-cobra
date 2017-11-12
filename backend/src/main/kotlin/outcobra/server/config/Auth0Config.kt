/*
package outcobra.server.config

import com.auth0.Auth0
import com.auth0.authentication.AuthenticationAPIClient
import com.auth0.authentication.result.UserProfile
import com.auth0.spring.security.api.Auth0JWTToken
import com.auth0.spring.security.api.Auth0SecurityConfig
import com.google.gson.Gson
import com.squareup.okhttp.OkHttpClient
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.security.SecurityProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.core.annotation.Order
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import outcobra.server.config.ProfileRegistry.Companion.AUTH0_PROXY
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import java.net.InetSocketAddress
import java.net.Proxy

@Profile("!$BASIC_AUTH_SECURITY_MOCK")
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
class Auth0Config : Auth0SecurityConfig() {

    @Value("\${http.proxyHost:}")
    lateinit var proxyHost: String
    @Value("\${http.proxyPort:}")
    lateinit var proxyPort: String


    @Bean
    fun auth0Client(authenticationAPIClient: AuthenticationAPIClient): Auth0Client {
        return Auth0Client(authenticationAPIClient)
    }

    @Bean
    fun auth0(): Auth0 {
        return Auth0(clientId, issuer)
    }

    @Bean
    @Profile(AUTH0_PROXY)
    fun auth0APIClientProxy(auth0: Auth0, httpClient: OkHttpClient, gson: Gson): AuthenticationAPIClient {
        val constr = AuthenticationAPIClient::class.java.getDeclaredConstructor(Auth0::class.java, OkHttpClient::class.java, Gson::class.java)
        constr.isAccessible = true
        return constr.newInstance(auth0, httpClient, gson)
    }

    @Bean
    @Profile(AUTH0_PROXY)
    fun okHttpClientProxy(): OkHttpClient {
        val httpClient = OkHttpClient()
        httpClient.proxy = Proxy(Proxy.Type.HTTP, InetSocketAddress(proxyHost, Integer.parseInt(proxyPort)))
        return httpClient
    }

    @Bean
    @Profile(AUTH0_PROXY)
    fun auth0GsonProvider(): Gson {
        val gProvider = Class.forName("com.auth0.authentication.GsonProvider")
        val buildGsonMethod = gProvider.getDeclaredMethod("buildGson")
        buildGsonMethod.isAccessible = true
        return buildGsonMethod.invoke(null) as Gson
    }

    @Bean
    @Profile("!$AUTH0_PROXY")
    fun auth0APIClientNoProxy(auth0: Auth0): AuthenticationAPIClient {
        return auth0.newAuthenticationAPIClient()
    }

}

class Auth0Client(val client: AuthenticationAPIClient) {
    fun getUserProfile(token: Auth0JWTToken): UserProfile = client.tokenInfo(token.jwt).execute()
}*/
