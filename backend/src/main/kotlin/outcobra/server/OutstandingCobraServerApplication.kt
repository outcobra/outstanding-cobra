package outcobra.server

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class OutstandingCobraServerApplication

fun main(args: Array<String>) {
    SpringApplication.run(OutstandingCobraServerApplication::class.java, *args)
}
