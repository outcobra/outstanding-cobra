package outcobra.server

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.PropertySource
import org.springframework.context.annotation.PropertySources

@SpringBootApplication
@PropertySources(
        PropertySource("classpath:application.properties"),
        PropertySource("classpath:auth0.properties"))
open class OutstandingCobraServerApplication

fun main(args: Array<String>) {
    SpringApplication.run(OutstandingCobraServerApplication::class.java, *args)
}
