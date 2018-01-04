package outcobra.server.web.auth.util

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import outcobra.server.util.getExpirationTime
import outcobra.server.util.setExpirationTime
import outcobra.server.web.auth.exception.JwtExpiredException
import outcobra.server.web.auth.model.OutcobraUser
import java.time.LocalDateTime


@Component
class JwtUtil(@Value("\${security.jwt.secret}") private val secret: String) {
    companion object {
        private val LOGGER = LoggerFactory.getLogger(JwtUtil::class.java)
    }

    fun parseToken(token: String): Claims? {
        @Suppress("UsePropertyAccessSyntax")
        try {
            val body: Claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .body
            val expiration: LocalDateTime = body.getExpirationTime()
            if (expiration.isBefore(LocalDateTime.now())) {
                throw JwtExpiredException(expiration)
            }

            return body
        } catch (e: Exception) {
            LOGGER.debug("JWT Validation failed", e)
            return null
        }
    }

    fun generateToken(u: OutcobraUser): String {
        val claims = Jwts.claims().setSubject(u.username)
        claims.setExpirationTime(LocalDateTime.now().plusHours(4))
        claims["mail"] = u.mail

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact()
    }
}