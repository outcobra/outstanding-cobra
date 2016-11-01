package outcobra.server.model.repository

import com.google.common.truth.Truth.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QUser
import outcobra.server.model.User

@RunWith(SpringRunner::class)
@SpringBootTest
open class UserRepositoryTest {

    @Autowired
    lateinit var userRepository: UserRepository
    val myUser = User("some_auth0_id", "jmesserli", null)

    @Test
    @Transactional
    open fun testUserRepository() {
        userRepository.save(myUser)
        userRepository.flush()
        assertThat(userRepository.findAll().size).isEqualTo(1)

        val savedUser = userRepository.findOne("some_auth0_id")
        assertThat(savedUser).isEqualTo(myUser)

        userRepository.delete(savedUser)
        assertThat(userRepository.findAll().size).isEqualTo(0)
    }

    @Test
    @Transactional
    open fun testQuerydslExecutor() {
        userRepository.save(myUser)

        val predicate = QUser.user.auth0Id.eq(myUser.auth0Id)
        val savedUser = userRepository.findOne(predicate)

        assertThat(savedUser).isEqualTo(myUser)

        userRepository.delete(savedUser.auth0Id)
        assertThat(userRepository.findAll().size).isEqualTo(0)
    }
}