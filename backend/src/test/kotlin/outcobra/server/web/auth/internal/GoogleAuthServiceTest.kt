package outcobra.server.web.auth.internal

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.json.webtoken.JsonWebSignature
import org.apache.commons.lang3.BooleanUtils
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatThrownBy
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Matchers
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Primary
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import outcobra.server.config.ProfileRegistry
import outcobra.server.data.loaders.UserDataLoader
import outcobra.server.exception.ValidationException
import outcobra.server.exception.ValidationKey
import outcobra.server.model.domain.Identity
import outcobra.server.model.repository.IdentityRepository
import outcobra.server.model.repository.UserRepository
import outcobra.server.web.auth.config.AuthRegistry
import outcobra.server.web.auth.internal.GoogleAuthServiceTest.Config.Companion.NEXT_USER
import outcobra.server.web.auth.model.OutcobraUser
import outcobra.server.web.auth.util.JwtUtil
import java.security.SignatureException
import java.util.*
import javax.inject.Inject

@RunWith(SpringRunner::class)
@SpringBootTest
@ActiveProfiles(ProfileRegistry.TEST)
class GoogleAuthServiceTest {
    @Inject
    lateinit var jwtUtil: JwtUtil

    @Inject
    @Qualifier(AuthRegistry.GOOGLE)
    lateinit var authService: GoogleAuthService

    @Inject
    lateinit var userRepository: UserRepository
    @Inject
    lateinit var identityRepository: IdentityRepository

    companion object {
        private val USER_MAIL = "googletest@outcobra.school"
        private val USER_NAME = "googletest"
        private val USER_SUB = "123456789"
    }

    @Test
    fun signUpCreatesUserAndIdentityAndReturnsValidToken() {
        val token = authService.signUp("true")
        val decodedToken = jwtUtil.parseToken(token.token)

        assertThat(decodedToken!!.subject).isEqualTo(USER_NAME)
        assertThat(decodedToken["mail"]).isEqualTo(USER_MAIL)

        val createdUser = userRepository.findByMail(USER_MAIL)
        assertThat(createdUser).isNotNull()

        val identity = identityRepository.findByUserAndIdentityType(createdUser!!, AuthRegistry.GOOGLE).first()
        assertThat(identity).isNotNull()
    }

    @Test
    fun signUpWithInvalidTokenFails() {
        assertThatThrownBy { authService.signUp("false") }
                .isInstanceOf(ValidationException::class.java)
                .hasMessage(ValidationKey.IDENTITY_PROVIDER_FAILED.i18nMessage)
    }

    @Test
    fun signUpWithEmptyTokenFails() {
        assertThatThrownBy { authService.signUp("") }
                .isInstanceOf(ValidationException::class.java)
                .hasMessage(ValidationKey.FORBIDDEN.i18nMessage)
    }

    @Test
    fun loginWithValidCredentialsWorks() {
        val user = userRepository.findByMail(UserDataLoader.loadedUserMail)
        identityRepository.save(Identity(user, AuthRegistry.GOOGLE, UserDataLoader.loadedPassword, null))
        identityRepository.flush()

        val lastUser = NEXT_USER
        NEXT_USER = OutcobraUser(UserDataLoader.loadedUserName, UserDataLoader.loadedPassword, UserDataLoader.loadedUserMail)

        val token = authService.login("true")
        val decodedToken = jwtUtil.parseToken(token.token)

        assertThat(decodedToken!!.subject).isEqualTo(UserDataLoader.loadedUserName)
        assertThat(decodedToken["mail"]).isEqualTo(UserDataLoader.loadedUserMail)
        assertThat(decodedToken.expiration).isAfter(Date())

        NEXT_USER = lastUser
    }

    @Test
    fun loginWithUnknownUserFails() {
        val lastUser = NEXT_USER
        NEXT_USER = OutcobraUser("a", "b", "c@d.ch")
        assertThatThrownBy { authService.login("true") }
                .isInstanceOf(ValidationException::class.java)
                .hasMessage(ValidationKey.USER_NOT_SIGNED_UP.i18nMessage)

        NEXT_USER = lastUser
    }

    @TestConfiguration
    class Config {
        companion object {
            var NEXT_USER: OutcobraUser = OutcobraUser(USER_NAME, USER_SUB, USER_MAIL)

            @Bean
            @Primary
            fun idTokenVerifier(): GoogleIdTokenVerifier {
                val mockVerifier = mock(GoogleIdTokenVerifier::class.java)

                `when`(mockVerifier.verify(Matchers.anyString())).then {
                    val toBoolean = BooleanUtils.toBoolean(it.arguments.first() as String)
                    if (!toBoolean) {
                        throw SignatureException("Test Signature Invalid")
                    }
                    val payload = GoogleIdToken.Payload()
                    payload.email = NEXT_USER.mail
                    payload.subject = NEXT_USER.password
                    payload["name"] = NEXT_USER.username
                    GoogleIdToken(JsonWebSignature.Header(), payload, ByteArray(0), ByteArray(0))
                }
                return mockVerifier
            }
        }
    }
}