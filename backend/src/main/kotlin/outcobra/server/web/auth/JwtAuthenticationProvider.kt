package outcobra.server.web.auth

import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import outcobra.server.model.repository.UserRepository
import outcobra.server.web.auth.model.JwtAuthenticationToken
import outcobra.server.web.auth.model.OutcobraUser
import outcobra.server.web.auth.util.JwtUtil

@Component
class JwtAuthenticationProvider(val jwtUtil: JwtUtil,
                                val userRepository: UserRepository) : AuthenticationProvider {
    override fun authenticate(authentication: Authentication?): Authentication {
        val jwtAuthenticationToken = authentication as JwtAuthenticationToken

        val parsedUser = jwtUtil.parseToken(jwtAuthenticationToken.token) ?: throw BadCredentialsException("JWT token is not valid")

        val user = userRepository.findByMail(parsedUser["mail"] as String) ?: throw IllegalStateException("User must exist in db")
        return JwtAuthenticationToken(jwtAuthenticationToken.token, OutcobraUser(parsedUser.subject, "", user.mail))
    }

    override fun supports(authentication: Class<*>?): Boolean {
        return JwtAuthenticationToken::class.java.isAssignableFrom(authentication)
    }
}