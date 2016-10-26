package outcobra.server

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.PropertySource
import org.springframework.context.annotation.PropertySources
import springfox.documentation.swagger2.annotations.EnableSwagger2

@SpringBootApplication
@PropertySources(
        PropertySource("classpath:application.properties"),
        PropertySource("classpath:auth0.properties"))
@EnableSwagger2
open class OutstandingCobraServerApplication

fun main(args: Array<String>) {
    SpringApplication.run(OutstandingCobraServerApplication::class.java, *args)
}
