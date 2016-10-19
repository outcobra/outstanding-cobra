package outcobra.server.model.repository

import com.google.common.truth.Truth.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.User

@RunWith(SpringRunner::class)
@SpringBootTest
open class UserRepositoryTest  {

    @Autowired
    val userRepository : UserRepository? = null

    @Test
    @Transactional
    open fun testUserRepository() {
        if (userRepository == null) throw Exception("")

        val myUser = User("some_auth0_id", "jmesserli", null)
        userRepository.save(myUser)
        userRepository.flush()
        assertThat(userRepository.findAll().size).isEqualTo(1)

        val savedUser = userRepository.findOne("some_auth0_id")
        assertThat(savedUser).isEqualTo(myUser)

        userRepository.delete(savedUser)
        assertThat(userRepository.findAll().size).isEqualTo(0)
    }

}