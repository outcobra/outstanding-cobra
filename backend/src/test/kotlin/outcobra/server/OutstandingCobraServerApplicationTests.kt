package outcobra.server

import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.context.annotation.Primary
import org.springframework.test.context.junit4.SpringRunner
import outcobra.server.model.User
import outcobra.server.model.dto.UserDto
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.UserService

@RunWith(SpringRunner::class)
@SpringBootTest
class OutstandingCobraServerApplicationTests {

	@Autowired
	lateinit var userRepository: UserRepository


	@Test
	fun contextLoads(){}

}
