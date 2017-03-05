package outcobra.server

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import outcobra.server.annotation.Open
import outcobra.server.config.ProfileRegistry.Companion.TEST

@RunWith(SpringRunner::class)
@SpringBootTest
@ActiveProfiles(TEST)
@Open
class OutstandingCobraServerApplicationTests {
    @Test
    fun contextLoads() {

    }
}
