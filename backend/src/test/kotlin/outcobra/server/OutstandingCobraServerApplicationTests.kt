package outcobra.server

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import outcobra.server.model.repository.UserRepository

@RunWith(SpringRunner::class)
@SpringBootTest
class OutstandingCobraServerApplicationTests {

	@Autowired
	lateinit var userRepository: UserRepository


	@Test
	fun contextLoads(){}

}
