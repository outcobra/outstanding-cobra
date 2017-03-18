package outcobra.server.data

import org.slf4j.LoggerFactory
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import outcobra.server.config.ProfileRegistry.Companion.LOAD_TEST_DATA
import outcobra.server.data.loaders.DataLoader
import javax.inject.Inject

/**
 * Picks up any [DataLoader] beans and invokes them in the specified order
 *
 * @see DataLoadOrder
 * @author Joel Messerli
 * @since <since>
 */
@Component
@Profile(LOAD_TEST_DATA)
class DataLoaderService
@Inject constructor(val dataLoaders: List<DataLoader>) : ApplicationRunner {
    companion object {
        private val LOGGER = LoggerFactory.getLogger(DataLoaderService::class.java)
    }

    override fun run(args: ApplicationArguments?) {
        LOGGER.info("Loading data")

        dataLoaders.forEach { loader ->
            val loaderName = loader.javaClass.simpleName
            try {
                if (loader.shouldLoad()) {
                    LOGGER.debug("Started loading $loaderName")
                    loader.load()
                    LOGGER.debug("Finished loading $loaderName")
                } else {
                    LOGGER.info("Not loading $loaderName because shouldLoad() returned false")
                }
            } catch (e: Exception) {
                LOGGER.error("Could not load $loaderName")
            }
        }

        LOGGER.info("Finished loading data")
    }
}