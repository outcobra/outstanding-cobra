package outcobra.server.util

import org.slf4j.LoggerFactory
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoaderService
import javax.annotation.PostConstruct
import javax.inject.Inject

/**
 * Helper class to log all active profiles
 * mostly used for configuration checks
 * @author Florian Bürgi
 */
@Component
open class EnvironmentLogger @Inject constructor(val environment: Environment) {
    companion object {
        private val LOGGER = LoggerFactory.getLogger(DataLoaderService::class.java)
    }

    @PostConstruct
    fun logActive() {
        println("logging profiles")
        environment.activeProfiles.forEach { LOGGER.info(it) }
    }
}