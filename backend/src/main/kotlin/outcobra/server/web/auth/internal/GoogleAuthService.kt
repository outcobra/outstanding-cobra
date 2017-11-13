package outcobra.server.web.auth.internal

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import outcobra.server.exception.ValidationKey
import outcobra.server.model.Identity
import outcobra.server.model.QIdentity
import outcobra.server.model.User
import outcobra.server.model.mapper.UserMapper
import outcobra.server.model.repository.IdentityRepository
import outcobra.server.model.repository.UserRepository
import outcobra.server.web.auth.AuthService
import outcobra.server.web.auth.config.AuthRegistry
import outcobra.server.web.auth.util.JwtUtil
import javax.inject.Inject

@Component
@Qualifier(AuthRegistry.GOOGLE)
class GoogleAuthService @Inject constructor(
        private val userRepository: UserRepository,
        private val identityRepository: IdentityRepository,
        private val userMapper: UserMapper,
        private val jwtUtil: JwtUtil,
        @Value("\${googleapi.clientId}") val clientId: String) : AuthService {

    val idTokenVerifier: GoogleIdTokenVerifier = GoogleIdTokenVerifier.Builder(NetHttpTransport(), JacksonFactory())
            .setAudience(listOf(clientId))
            .build()

    override fun loginOrSignUp(identification: String?, secret: String): String {
        if (secret.isEmpty()) {
            ValidationKey.FORBIDDEN.throwException()
        }

        val idToken = idTokenVerifier.verify(secret)?.payload

        val predicate = QIdentity.identity.identifier.eq(idToken!!.subject).and(QIdentity.identity.identityType.eq(AuthRegistry.GOOGLE))
        val identities = identityRepository.findAll(predicate).toList()

        if (identities.size > 1) {
            ValidationKey.IDENTITY_ALREADY_EXISTS.throwException()
        }

        if (identities.size == 1) {
            return userMapper.toDto(identities.first().user)
        }

        val newUser = User(null, "", idToken["name"] as String, "")
        val user = userRepository.save(newUser)

        identityRepository.save(Identity(user, AuthRegistry.GOOGLE, idToken.subject, null))

        return userMapper.toDto(user)
    }

    fun userToToken(user: User): String {
        return jwtUtil.generateToken()
    }
}