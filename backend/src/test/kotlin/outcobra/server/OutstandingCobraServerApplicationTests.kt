package outcobra.server

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

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
