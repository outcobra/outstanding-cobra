package outcobra.server

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cache.annotation.EnableCaching
import springfox.documentation.swagger2.annotations.EnableSwagger2

@SpringBootApplication
@EnableSwagger2
@EnableCaching
class OutstandingCobraServerApplication

fun main(args: Array<String>) {
    SpringApplication.run(OutstandingCobraServerApplication::class.java, *args)
}
