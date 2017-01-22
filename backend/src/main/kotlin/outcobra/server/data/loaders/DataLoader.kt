package outcobra.server.data.loaders

import org.springframework.stereotype.Component
import outcobra.server.data.DataLoaderService

/**
 * All our DataLoaders must implement this interface. The [DataLoaderService] will pick up any [DataLoader]s that are annotated with [Component]
 */
interface DataLoader {
    /**
     * Whether or not to invoke this loader during application startup
     */
    fun shouldLoad(): Boolean

    /**
     * Gets called by [DataLoaderService] when this [DataLoader] is invoked
     */
    fun load(): Unit
}