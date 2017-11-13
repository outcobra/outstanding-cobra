package outcobra.server.service.internal

//import outcobra.server.config.Auth0Client
import org.springframework.context.annotation.Profile
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import outcobra.server.annotation.DefaultImplementation
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import outcobra.server.model.Identity
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.IdentityRepository
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import outcobra.server.web.auth.model.JwtAuthenticationToken
import outcobra.server.web.auth.model.OutcobraUser
import javax.inject.Inject

@Service
@DefaultImplementation
@Profile("!$BASIC_AUTH_SECURITY_MOCK")
class DefaultUserService
@Inject constructor(val userRepository: UserRepository,
                    val identityRepository: IdentityRepository,
                    val userDtoMapper: Mapper<User, UserDto>) : UserService {
    override fun getCurrentOutcobraUser(): OutcobraUser {
        return (SecurityContextHolder.getContext().authentication as JwtAuthenticationToken).principal!!
    }

    override fun getCurrentUser(): User {
        return userRepository.findByMail(getCurrentOutcobraUser().mail)!!
    }

    override fun readUserById(id: Long): User {
        return userRepository.findOne(id)
    }

    override fun findIdentitiesByIdentifierAndType(identifier: String, identityType: String): List<Identity> {
        return identityRepository.findByIdentifierAndIdentityType(identifier, identityType)
    }

    /*override fun readUserById(id: Long): User {
        return userRepository.getOne(id)
    }

    override fun getTokenUserId(): String {
        val userDetails = SecurityContextHolder.getContext().authentication.principal as Auth0UserDetails
        return userDetails.getAuth0Attribute("sub") as String
    }

    override fun getCurrentUser() = userRepository.findOne(QUser.user.auth0Id.eq(getTokenUserId()))
            ?: ValidationKey.USER_NOT_IN_DATABASE_RELOGIN.throwException()

    override fun getCurrentUserDto() = userDtoMapper.toDto(getCurrentUser())!!

    override fun getUserProfile(): UserProfile {
        val auth = SecurityContextHolder.getContext().authentication
        return UserProfile("", "", "", "", "", true, "", Date(), listOf(), mapOf(), mapOf(), mapOf(), "")
    }

    override fun loginRegister(): UserDto {
        return try {
            userDtoMapper.toDto(getCurrentUser())
        } catch (vex: ValidationException) {
            val userDetails = getUserProfile()
            val newUser = User(userDetails.id, userDetails.nickname, userDetails.email, null)
            userDtoMapper.toDto(userRepository.save(newUser))
        }
    }*/
}