package outcobra.server.web.config

import org.springframework.boot.autoconfigure.security.SecurityProperties
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.core.annotation.Order
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK


@Profile(BASIC_AUTH_SECURITY_MOCK)
@Configuration
@EnableWebSecurity
@Order(SecurityProperties.BASIC_AUTH_ORDER - 1)
class BasicAuthConfig : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity?) {
        http!!.authorizeRequests()
                .anyRequest().authenticated()
                .and().httpBasic()
    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth!!.inMemoryAuthentication()
                .withUser("admin").password("secret").roles("ADMIN")
                .and()
                .withUser("user").password("secret").roles("USER")
    }
}
