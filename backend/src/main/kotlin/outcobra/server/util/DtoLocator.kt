package outcobra.server.util

import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Component
import org.springframework.util.ClassUtils
import outcobra.server.config.CacheRegistry.Companion.DTO_FOR_NAME

/**
 * Can be used to find the class of a dto by the name of the corresponding entity
 *
 * @author Joel Messerli
 * @since 1.0.0
 */
@Component
class DtoLocator {
    companion object {
        /**
         * The package all dtos belong to
         */
        val DTO_PACKAGE_NAME = "outcobra.server.outcobra.server.model.dto"
    }

    /**
     * Returns the class of a dto by its entity's name
     *
     * @since 1.0.0
     * @throws ClassNotFoundException if the dtos class could not be found
     */
    @Cacheable(DTO_FOR_NAME)
    fun getForEntityName(entityName: String): Class<*> =
            ClassUtils.forName("$DTO_PACKAGE_NAME.${entityName.firstToUpper()}Dto", null)
}