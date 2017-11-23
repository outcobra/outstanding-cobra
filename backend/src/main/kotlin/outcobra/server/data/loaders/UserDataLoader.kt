package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.data.DataLoadOrder.USER
import outcobra.server.model.User
import outcobra.server.model.repository.UserRepository
import outcobra.server.web.auth.AuthService
import outcobra.server.web.auth.model.UsernamePasswordDto
import javax.inject.Inject

/**
 * This [DataLoader] loads our test [User]s
 *
 * @author Joel Messerli
 * @since 1.1.0
 */
@Component
@Transactional
@Order(USER)
class UserDataLoader
@Inject constructor(val userRepository: UserRepository,
                    val authService: AuthService<UsernamePasswordDto>) : DataLoader {

    companion object {
        var TEST_USER: User? = null
        val loadedUserName = "OutcobraTest"
        val loadedUserMail = "testuser@outcobra.ch"
        val loadedPassword = "Secret$1"
        private val LOGGER = LoggerFactory.getLogger(UserDataLoader::class.java)
        var loaded = false
    }

    override fun shouldLoad() = true


    override fun load() {
        authService.loginOrSignUp(UsernamePasswordDto(loadedUserName, loadedUserMail, loadedPassword))
        TEST_USER = userRepository.findByMail(loadedUserMail)
        LOGGER.debug("Signing up User: ${TEST_USER?.username ?: "null"}")

        loaded = true
    }
}
