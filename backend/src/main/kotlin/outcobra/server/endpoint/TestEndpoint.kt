package outcobra.server.endpoint

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.model.ExamRepository
import javax.inject.Inject

@RestController
@RequestMapping("/test")
class TestEndpoint @Inject constructor(val examRepository: ExamRepository) {
    @RequestMapping("/unsafe")
    fun unsafe(): String = "Unsafe hello"

    @RequestMapping("/safe")
    fun safe(): String = "Safe hello"
}
