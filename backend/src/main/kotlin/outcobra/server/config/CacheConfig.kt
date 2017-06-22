package outcobra.server.config

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import outcobra.server.config.CacheRegistry.Companion.DTO_FOR_NAME
import outcobra.server.config.CacheRegistry.Companion.REPO_FOR_DTO
import outcobra.server.config.CacheRegistry.Companion.REPO_FOR_ENTITY
import outcobra.server.config.CacheRegistry.Companion.REPO_FOR_NAME
import outcobra.server.config.ProfileRegistry.Companion.TEST
import javax.cache.CacheManager
import javax.cache.configuration.MutableConfiguration
import javax.cache.expiry.Duration
import javax.cache.expiry.TouchedExpiryPolicy

/**
 * This class configures and creates and all the (eh)caches used in our app.
 * @author Florian Bürgi
 * @since <since>
 **/

@Configuration
@Profile("!$TEST")
class CacheConfig : JCacheManagerCustomizer {

    override fun customize(cacheManager: CacheManager) {
        val config = MutableConfiguration<Any, Any>()
                .setStoreByValue(false)
                .setStatisticsEnabled(false)
                .setExpiryPolicyFactory(TouchedExpiryPolicy.factoryOf(Duration.ETERNAL))

        cacheManager.createCache(REPO_FOR_DTO, config)
        cacheManager.createCache(REPO_FOR_ENTITY, config)
        cacheManager.createCache(REPO_FOR_NAME, config)
        cacheManager.createCache(DTO_FOR_NAME, config)
    }
}



