package outcobra.server.service.internal

import com.auth0.authentication.result.UserProfile
import org.springframework.context.annotation.Profile
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import outcobra.server.data.loaders.UserDataLoader
import outcobra.server.exception.ValidationKey
import outcobra.server.model.QUser
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.mapper.UserDtoMapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.1.0
 *
 */
@Profile(BASIC_AUTH_SECURITY_MOCK)
@Service
class BasicAuthUserService @Inject constructor(val userRepository: UserRepository,
                                               val userDtoMapper: UserDtoMapper) : UserService {
    override fun readUserById(id: Long): User {
        return userRepository.getOne(id)
    }

    override fun getTokenUserId(): String {
        val isAuthenticated = SecurityContextHolder.getContext().authentication.isAuthenticated
        if (isAuthenticated) {
            return UserDataLoader.TEST_USER?.auth0Id ?: "basicAuthUserToken"
        }
        return ""
    }

    override fun getCurrentUser() = userRepository.findOne(QUser.user.auth0Id.eq(getTokenUserId()))
            ?: ValidationKey.USER_NOT_IN_DATABASE_RELOGIN.throwException()

    override fun getCurrentUserDto() = userDtoMapper.toDto(getCurrentUser())

    override fun getUserProfile(): UserProfile {
        throw UnsupportedOperationException("function not available within this security mock")
    }

    override fun loginRegister(): UserDto {
        throw UnsupportedOperationException("function not available within this security mock")
    }

}