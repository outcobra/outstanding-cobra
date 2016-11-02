package outcobra.server

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import outcobra.server.filter.RequestAuthorizationFilter
import outcobra.server.model.Holiday
import outcobra.server.model.User
import outcobra.server.service.internal.DefaultAuthorizationService
import outcobra.server.service.internal.DefaultUserService
import java.util.*

@RunWith(SpringRunner::class)
@SpringBootTest
class OutstandingCobraServerApplicationTests {

    @Test
    fun contextLoads() {
    }

//    @Test
//    fun test() {
//        var raf = RequestAuthorizationFilter(DefaultAuthorizationService())
//        val user: User = raf.parseJson() as User
//        assert(user.equals(User("lala122", "sdggsd", ArrayList())))
//    }
}
