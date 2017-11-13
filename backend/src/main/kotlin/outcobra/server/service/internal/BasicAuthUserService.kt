package outcobra.server.service.internal

import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import outcobra.server.model.Identity
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.mapper.UserMapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import outcobra.server.web.auth.model.OutcobraUser
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.1.0
 *
 */
@Profile(BASIC_AUTH_SECURITY_MOCK)
@Service
class BasicAuthUserService @Inject constructor(val userRepository: UserRepository,
                                               val userMapper: UserMapper) : UserService {
    override fun getCurrentUserDto(): UserDto {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getCurrentOutcobraUser(): OutcobraUser {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getCurrentUser(): User {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun readUserById(id: Long): User {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun findIdentitiesByIdentifierAndType(identifier: String, identityType: String): List<Identity> {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
    /*override fun readUserById(id: Long): User {
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

    override fun getCurrentUserDto() = userMapper.toDto(getCurrentUser())!!

    override fun getUserProfile(): UserProfile {
        throw UnsupportedOperationException("function not available within this security mock")
    }

    override fun loginRegister(): UserDto {
        throw UnsupportedOperationException("function not available within this security mock")
    }*/

}