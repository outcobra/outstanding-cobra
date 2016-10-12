package outcobra.server.endpoint

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/test")
class TestEndpoint {
    @RequestMapping("/unsafe")
    fun unsafe(): String = "Unsafe hello"

    @RequestMapping("/safe")
    fun safe(): String = "Safe hello"
}
