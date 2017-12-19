package outcobra.server.web.auth.util

import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import me.mkweb.releasr.web.auth.exception.JwtExpiredException
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import outcobra.server.util.getExpirationTime
import outcobra.server.util.setExpirationTime
import outcobra.server.web.auth.model.OutcobraUser
import java.time.LocalDateTime


@Component
class JwtUtil(@Value("\${security.jwt.secret}") private val secret: String) {
    /**
     * Tries to parse specified String as a JWT token. If successful, returns User object with username, id and role prefilled (extracted from token).
     * If unsuccessful (token is invalid or not containing all required user properties), simply returns null.
     *
     * @param token the JWT token to parse
     * @return the User object extracted from specified token or null if a token is invalid.
     */
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
        } catch (e: JwtException) {
            return null
        } catch (e: ClassCastException) {
            return null
        }
    }

    /**
     * Generates a JWT token containing username as subject, and userId and role as additional claims. These properties are taken from the specified
     * User object. Tokens validity is infinite.
     *
     * @param u the user for which the token will be generated
     * @return the JWT token
     */
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