package outcobra.server.web.auth.internal

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Component
import outcobra.server.exception.ValidationKey
import outcobra.server.model.Identity
import outcobra.server.model.User
import outcobra.server.model.repository.IdentityRepository
import outcobra.server.model.repository.UserRepository
import outcobra.server.web.auth.config.AuthRegistry
import outcobra.server.web.auth.model.AuthResponseDto
import outcobra.server.web.auth.util.JwtUtil
import java.lang.Exception
import javax.inject.Inject

@Component
@Qualifier(AuthRegistry.GOOGLE)
class GoogleAuthService @Inject constructor(
        private val userRepository: UserRepository,
        private val identityRepository: IdentityRepository,
        private val idTokenVerifier: GoogleIdTokenVerifier,
        jwtUtil: JwtUtil) : BaseAuthService<String>(jwtUtil) {

    override fun login(arg: String): AuthResponseDto {
        val idToken = verifyToken(arg)

        val identities = identityRepository.findByIdentifierAndIdentityType(idToken.subject, AuthRegistry.GOOGLE)

        if (identities.size == 1) {
            return userToResponse(identities.first().user)
        }
        ValidationKey.USER_NOT_SIGNED_UP.throwException()
    }

    override fun signUp(arg: String): AuthResponseDto {
        val idToken = verifyToken(arg)

        val identities = identityRepository.findByIdentifierAndIdentityType(idToken.subject, AuthRegistry.GOOGLE)

        if (identities.size == 1) {
            return userToResponse(identities.first().user)
        }

        val newUser = User(null, idToken["name"] as String, idToken.email)
        val user = userRepository.save(newUser)

        identityRepository.save(Identity(user, AuthRegistry.GOOGLE, idToken.subject, null))

        return userToResponse(user)
    }

    private fun verifyToken(token: String): GoogleIdToken.Payload {
        if (token.isEmpty()) {
            ValidationKey.FORBIDDEN.throwException()
        }
        return try {
            idTokenVerifier.verify(token).payload
        } catch (ex: Exception) {
            ValidationKey.IDENTITY_PROVIDER_FAILED.throwException()
        }
    }
}