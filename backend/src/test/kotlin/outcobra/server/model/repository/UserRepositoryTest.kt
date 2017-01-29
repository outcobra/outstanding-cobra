package outcobra.server.model.repository

import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.QUser
import outcobra.server.model.User
import javax.inject.Inject

@RunWith(SpringRunner::class)
@SpringBootTest
open class UserRepositoryTest {

    @Inject
    lateinit var userRepository: UserRepository
    val myUser = User(null, "some_auth0_id", "jmesserli")

    companion object{
        var userCount = 0L
    }

    @Before
    fun getUserCount(){
        userCount = userRepository.count()
    }

    @Test
    @Transactional
    open fun testUserRepository() {
        val saved = userRepository.save(myUser)
        userRepository.flush()
        assertThat(userRepository.count()).isEqualTo(userCount+1)

        val savedUser = userRepository.findOne(saved.id)
        assertThat(savedUser).isEqualTo(myUser)

        userRepository.delete(savedUser)
        assertThat(userRepository.count()).isEqualTo(userCount)
    }

    @Test
    @Transactional
    open fun testQueryDslExecutor() {
        userRepository.save(myUser)

        val predicate = QUser.user.auth0Id.eq(myUser.auth0Id)
        val savedUser = userRepository.findOne(predicate)

        assertThat(savedUser).isEqualTo(myUser)

        userRepository.delete(savedUser.id)
        assertThat(userRepository.count()).isEqualTo(userCount)
    }
}