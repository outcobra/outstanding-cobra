package outcobra.server.service.internal

import com.auth0.authentication.result.UserProfile
import org.springframework.context.annotation.Profile
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import outcobra.server.data.loaders.UserDataLoader
import outcobra.server.model.QUser
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.mapper.UserDtoMapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import javax.inject.Inject

/**
 * Created by Florian on 05.02.2017.
 */
@Profile(BASIC_AUTH_SECURITY_MOCK)
@Service
open class BasicAuthUserService @Inject constructor(val userRepository: UserRepository,
                                                    val userDtoMapper: UserDtoMapper) : UserService {
    override fun readUserById(id: Long): User {
        return userRepository.getOne(id)
    }

    override fun getTokenUserId(): String {
        val isAuthenticated = SecurityContextHolder.getContext().authentication.isAuthenticated
        if(isAuthenticated) return if (UserDataLoader.loaded) UserDataLoader.loadedUserToken else "basicAuthUserToken"
        else return ""
    }

    override fun getCurrentUser(): User? {
        val auth0Id = getTokenUserId()
        return userRepository.findOne(QUser.user.auth0Id.eq(auth0Id))
    }

    override fun getCurrentUserDto(): UserDto? {
        val user = getCurrentUser()
        if (user == null) {
            return null
        } else {
            return userDtoMapper.toDto(user)
        }
    }

    override fun getUserProfile(): UserProfile {
        throw UnsupportedOperationException("function not available within this security mock")
    }

    override fun loginRegister(): UserDto {
        throw UnsupportedOperationException("function not available within this security mock")
    }

}