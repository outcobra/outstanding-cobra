package outcobra.server.model.repository

import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.config.ProfileRegistry.Companion.TEST
import outcobra.server.model.User
import javax.inject.Inject

@RunWith(SpringRunner::class)
@SpringBootTest
@Transactional
@ActiveProfiles(TEST)
class UserRepositoryTest {

    @Inject
    lateinit var userRepository: UserRepository
    val myUser = User(null, "some_auth0_id", "jmesserli")

    companion object {
        var userCount = 0L
    }

    @Before
    fun getUserCount() {
        userCount = userRepository.count()
    }

    @Test
    fun testUserRepository() {
        val saved = userRepository.save(myUser)
        userRepository.flush()
        assertThat(userRepository.count()).isEqualTo(userCount + 1)

        val newUser = userRepository.findOne(saved.id)
        assertThat(newUser).isEqualTo(myUser)

        userRepository.delete(newUser)
        assertThat(userRepository.count()).isEqualTo(userCount)
    }

    @Test
    fun testQueryDslExecutor() {
        val savedUser = userRepository.save(myUser)

        val newUser = userRepository.findOne(savedUser.id)

        assertThat(newUser).isEqualTo(myUser)

        userRepository.delete(newUser.id)
        assertThat(userRepository.count()).isEqualTo(userCount)
    }
}