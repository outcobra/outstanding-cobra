package outcobra.server.web.auth.internal

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import outcobra.server.exception.ValidationKey
import outcobra.server.model.Identity
import outcobra.server.model.User
import outcobra.server.model.repository.IdentityRepository
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import outcobra.server.web.auth.config.AuthRegistry
import outcobra.server.web.auth.model.AuthResponseDto
import outcobra.server.web.auth.util.JwtUtil
import javax.inject.Inject

@Component
@Qualifier(AuthRegistry.GOOGLE)
class GoogleAuthService @Inject constructor(
        private val userRepository: UserRepository,
        private val userService: UserService,
        private val identityRepository: IdentityRepository,
        jwtUtil: JwtUtil,
        @Value("\${security.google.clientId}") val clientId: String) : BaseAuthService<String>(jwtUtil) {

    val idTokenVerifier: GoogleIdTokenVerifier = GoogleIdTokenVerifier.Builder(NetHttpTransport(), JacksonFactory())
            .setAudience(listOf(clientId))
            .build()

    override fun loginOrSignUp(arg: String): AuthResponseDto {
        if (arg.isEmpty()) {
            ValidationKey.FORBIDDEN.throwException()
        }

        val idToken = idTokenVerifier.verify(arg)?.payload

        val identities = userService.findIdentitiesByIdentifierAndType(idToken!!.subject, AuthRegistry.GOOGLE)

        if (identities.size > 1) {
            ValidationKey.IDENTITY_ALREADY_EXISTS.throwException()
        }

        if (identities.size == 1) {
            return userToResponse(identities.first().user)
        }

        val newUser = User(null, idToken["name"] as String, "") // TODO use mail
        val user = userRepository.save(newUser)

        identityRepository.save(Identity(user, AuthRegistry.GOOGLE, idToken.subject, null))

        return userToResponse(user)
    }
}