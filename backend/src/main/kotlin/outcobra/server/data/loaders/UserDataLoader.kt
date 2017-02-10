package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.data.DataLoadOrder.USER
import outcobra.server.model.User
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService
import javax.inject.Inject

/**
 * This [DataLoader] loads our test [User]s
 *
 * @author Joel Messerli
 * @since <since>
 */
@Component
@Transactional
@Order(USER)
open class UserDataLoader
@Inject constructor(val userRepository: UserRepository,
                    val userService : UserService) : DataLoader {

    companion object {
        var TEST_USER: User? = null
        val loadedUserToken = "auth0|583b1ac145cc13f8065da5e2"
        val loadedUserName = "OutcobraTest"
        private val LOGGER = LoggerFactory.getLogger(UserDataLoader::class.java)
        var loaded = false
    }

    override fun shouldLoad() = true


    override fun load() {
        TEST_USER = userRepository.save(User(loadedUserToken, loadedUserName, arrayListOf()))
        LOGGER.debug("Saving user: ${TEST_USER!!.username}")
        loaded = true
    }
}
