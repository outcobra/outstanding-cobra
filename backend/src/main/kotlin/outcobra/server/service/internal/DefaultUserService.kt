package outcobra.server.service.internal

import org.springframework.context.annotation.Profile
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import outcobra.server.annotation.DefaultImplementation
import outcobra.server.config.ProfileRegistry.Companion.BASIC_AUTH_SECURITY_MOCK
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import outcobra.server.util.jwtAuthentication
import javax.inject.Inject

@Service
@DefaultImplementation
@Profile("!$BASIC_AUTH_SECURITY_MOCK")
class DefaultUserService
@Inject constructor(val userRepository: UserRepository,
                    val userDtoMapper: Mapper<User, UserDto>) : UserService {

    override fun getCurrentOutcobraUser() = SecurityContextHolder.getContext().jwtAuthentication().principal!!

    override fun getCurrentUser() = userRepository.findByMail(getCurrentOutcobraUser().mail)!!

    override fun getCurrentUserDto() = userDtoMapper.toDto(getCurrentUser())

    override fun readUserById(id: Long): User = userRepository.findOne(id)

    override fun checkEmailNotTaken(mail: String) = !userRepository.existsByMail(mail)
}