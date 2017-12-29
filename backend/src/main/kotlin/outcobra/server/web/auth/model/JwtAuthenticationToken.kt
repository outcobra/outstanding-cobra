package outcobra.server.web.auth.model

import org.springframework.security.authentication.AbstractAuthenticationToken

data class JwtAuthenticationToken(val token: String, private val userPrincipal: OutcobraUser? = null) : AbstractAuthenticationToken(listOf()) {
    override fun getPrincipal(): OutcobraUser? = this.userPrincipal

    override fun getCredentials() = token
}