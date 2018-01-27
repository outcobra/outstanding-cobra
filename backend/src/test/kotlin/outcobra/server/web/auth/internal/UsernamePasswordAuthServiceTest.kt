package outcobra.server.web.auth.internal

import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatThrownBy
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Primary
import org.springframework.security.crypto.password.NoOpPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.config.ProfileRegistry
import outcobra.server.data.loaders.UserDataLoader
import outcobra.server.exception.ValidationException
import outcobra.server.exception.ValidationKey
import outcobra.server.model.repository.IdentityRepository
import outcobra.server.model.repository.UserRepository
import outcobra.server.web.auth.config.AuthRegistry
import outcobra.server.web.auth.model.UsernamePasswordDto
import outcobra.server.web.auth.util.JwtUtil
import java.util.*
import javax.inject.Inject

@RunWith(SpringRunner::class)
@SpringBootTest
@ActiveProfiles(ProfileRegistry.TEST)
@Transactional
class UsernamePasswordAuthServiceTest {
    @Inject
    lateinit var jwtUtil: JwtUtil

    @Inject
    @Qualifier(AuthRegistry.PASSWORD)
    lateinit var authService: UsernamePasswordAuthService

    @Inject
    lateinit var userRepository: UserRepository
    @Inject
    lateinit var identityRepository: IdentityRepository

    companion object {
        private val USER_MAIL = "upastest@outcobra.school"
        private val USER_NAME = "upastest"
        private val USER_PASSWORD = "Secret$1"
    }

    @Test
    fun signUpCreatesUserAndIdentityAndReturnsValidToken() {
        val usernamePasswordTuple = UsernamePasswordDto(USER_NAME, USER_MAIL, USER_PASSWORD, USER_PASSWORD)
        val token = authService.signUp(usernamePasswordTuple)
        val decodedToken = jwtUtil.parseToken(token.token)

        assertThat(decodedToken!!.subject).isEqualTo(USER_NAME)
        assertThat(decodedToken["mail"]).isEqualTo(USER_MAIL)

        val createdUser = userRepository.findByMail(USER_MAIL)
        assertThat(createdUser).isNotNull()

        val identity = identityRepository.findByUserAndIdentityType(createdUser!!, AuthRegistry.PASSWORD).first()
        assertThat(identity).isNotNull()
        assertThat(identity.secret).isEqualTo(USER_PASSWORD)
    }

    @Test
    fun signUpWithUnsafePasswordFails() {
        val usernamePasswordTuple = UsernamePasswordDto(USER_NAME, USER_MAIL, "a", "a")

        assertThatThrownBy { authService.signUp(usernamePasswordTuple) }
                .isInstanceOf(ValidationException::class.java)
                .hasMessage(ValidationKey.PASSWORD_UNSAFE.i18nMessage)
    }

    @Test
    fun signUpWithDifferentPasswordFails() {
        val usernamePasswordTuple = UsernamePasswordDto(USER_NAME, USER_MAIL, USER_PASSWORD, "a")

        assertThatThrownBy { authService.signUp(usernamePasswordTuple) }
                .isInstanceOf(ValidationException::class.java)
                .hasMessage(ValidationKey.PASSWORDS_NOT_SAME.i18nMessage)
    }

    @Test
    fun signUpWithAlreadyExistingMailFails() {
        val usernamePasswordTuple = UsernamePasswordDto(USER_NAME, UserDataLoader.loadedUserMail, USER_PASSWORD, USER_PASSWORD)

        assertThatThrownBy { authService.signUp(usernamePasswordTuple) }
                .isInstanceOf(ValidationException::class.java)
                .hasMessage(ValidationKey.MAIL_OCCUPIED.i18nMessage)
    }

    @Test
    fun loginWithValidCredentialsWorks() {
        val usernamePasswordTuple = UsernamePasswordDto(mail = UserDataLoader.loadedUserMail, password = UserDataLoader.loadedPassword)

        val token = authService.login(usernamePasswordTuple)
        val decodedToken = jwtUtil.parseToken(token.token)

        assertThat(decodedToken!!.subject).isEqualTo(UserDataLoader.loadedUserName)
        assertThat(decodedToken["mail"]).isEqualTo(UserDataLoader.loadedUserMail)
        assertThat(decodedToken.expiration).isAfter(Date())
    }

    @Test
    fun loginWithInvalidPasswordFails() {
        val usernamePasswordTuple = UsernamePasswordDto(mail = UserDataLoader.loadedUserMail, password = "foo")

        assertThatThrownBy { authService.login(usernamePasswordTuple) }
                .isInstanceOf(ValidationException::class.java)
                .hasMessage(ValidationKey.NO_PASSWORD_MATCH.i18nMessage)
    }

    @Test
    fun loginWithUnknownCredentialsFails() {
        val usernamePasswordTuple = UsernamePasswordDto(mail = "dummy", password = "foo")

        assertThatThrownBy { authService.login(usernamePasswordTuple) }
                .isInstanceOf(ValidationException::class.java)
                .hasMessage(ValidationKey.USER_NOT_SIGNED_UP.i18nMessage)
    }

    @TestConfiguration
    class Config {
        companion object {
            @Bean
            @Primary
            fun passwordEncoder(): PasswordEncoder? = NoOpPasswordEncoder.getInstance()
        }
    }
}