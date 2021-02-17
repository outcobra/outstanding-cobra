package outcobra.server.model.repository

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.transaction.annotation.Transactional
import outcobra.server.config.ProfileRegistry.Companion.TEST
import outcobra.server.model.User
import javax.inject.Inject

@ExtendWith(SpringExtension::class)
@SpringBootTest
@Transactional
@ActiveProfiles(TEST)
class UserRepositoryTest {

    @Inject
    lateinit var userRepository: UserRepository
    val myUser = User("jmesserli_Test", "jmesserli@outcobra.school", listOf())

    companion object {
        var userCount = 0L
    }

    @BeforeEach
    fun getUserCount() {
        userCount = userRepository.count()
    }

    @Test
    fun testUserRepository() {
        val saved = userRepository.save(myUser)
        userRepository.flush()
        assertThat(userRepository.count()).isEqualTo(userCount + 1)

        val newUser = userRepository.getOne(saved.id)
        assertThat(newUser).isEqualTo(myUser)

        userRepository.delete(newUser)
        assertThat(userRepository.count()).isEqualTo(userCount)
    }

    @Test
    fun testQueryDslExecutor() {
        val savedUser = userRepository.save(myUser)

        val newUser = userRepository.getOne(savedUser.id)

        assertThat(newUser).isEqualTo(myUser)

        userRepository.deleteById(newUser.id)
        assertThat(userRepository.count()).isEqualTo(userCount)
    }
}
