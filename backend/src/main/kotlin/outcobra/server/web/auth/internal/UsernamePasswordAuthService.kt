package outcobra.server.web.auth.internal

import org.jooq.tools.StringUtils
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import outcobra.server.exception.ValidationKey
import outcobra.server.model.Identity
import outcobra.server.model.User
import outcobra.server.model.repository.IdentityRepository
import outcobra.server.model.repository.UserRepository
import outcobra.server.web.auth.config.AuthRegistry
import outcobra.server.web.auth.model.AuthResponseDto
import outcobra.server.web.auth.model.UsernamePasswordDto
import outcobra.server.web.auth.util.JwtUtil
import java.util.regex.Pattern

@Service
@Qualifier(AuthRegistry.PASSWORD)
class UsernamePasswordAuthService(private val userRepository: UserRepository,
                                  private val identityRepository: IdentityRepository,
                                  private val passwordEncoder: PasswordEncoder,
                                  jwtUtil: JwtUtil) : BaseAuthService<UsernamePasswordDto>(jwtUtil) {
    companion object {
        private val PASSWORD_REGEX: Pattern = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\$%^&+=])(?=\\S+\$).{8,}\$")
    }

    override fun login(arg: UsernamePasswordDto): AuthResponseDto {
        if (arg.mail.isEmpty() or arg.password.isEmpty()) {
            ValidationKey.INVALID_DTO.throwException()
        }

        val user = userRepository.findByMail(arg.mail)

        if (user != null) {
            val identities = identityRepository.findByUserAndIdentityType(user, AuthRegistry.PASSWORD)

            if (identities.size == 1) {
                if (!passwordEncoder.matches(arg.password, identities.first().secret)) {
                    ValidationKey.NO_PASSWORD_MATCH.throwException()
                }
                return userToResponse(user)
            }
        }
        ValidationKey.USER_NOT_IN_DATABASE_RELOGIN.throwException()
    }

    override fun signUp(arg: UsernamePasswordDto): AuthResponseDto {
        if (arg.mail.isEmpty() or arg.password.isEmpty() or StringUtils.isEmpty(arg.password) or StringUtils.isEmpty(arg.passwordVerify)) {
            ValidationKey.INVALID_DTO.throwException()
        }
        if (arg.password != arg.passwordVerify) {
            ValidationKey.PASSWORDS_NOT_SAME.throwException()
        }
        // TODO check for identity?
        if (userRepository.countByMail(arg.mail) != 0L) {
            ValidationKey.MAIL_OCCUPIED.throwException()
        }
        if (!PASSWORD_REGEX.matcher(arg.password).matches()) {
            ValidationKey.PASSWORD_UNSAFE.throwException()
        }

        val newUser = User(null, arg.username, arg.mail)
        val user = userRepository.save(newUser)

        val identity = Identity(user, AuthRegistry.PASSWORD, user!!.username, passwordEncoder.encode(arg.password))
        identityRepository.save(identity)
        return userToResponse(user)
    }
}