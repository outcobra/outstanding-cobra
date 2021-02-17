package outcobra.server

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension
import outcobra.server.config.ProfileRegistry.Companion.TEST

@ExtendWith(SpringExtension::class)
@SpringBootTest
@ActiveProfiles(TEST)
class OutstandingCobraServerApplicationTests {
    @Test
    fun contextLoads() {
    }
}
