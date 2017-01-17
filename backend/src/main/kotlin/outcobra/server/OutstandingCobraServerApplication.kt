package outcobra.server

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import springfox.documentation.swagger2.annotations.EnableSwagger2

@SpringBootApplication
@EnableSwagger2
open class OutstandingCobraServerApplication

fun main(args: Array<String>) {
    SpringApplication.run(OutstandingCobraServerApplication::class.java, *args)
}
