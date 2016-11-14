package outcobra.server.util

import org.springframework.stereotype.Component
import org.springframework.util.ClassUtils

@Component
class DtoLocator {
    companion object {
        val DTO_PACKAGE_NAME = "outcobra.server.model.dto"
    }

    fun getForEntityName(entityName: String): Class<*> {
        val clazz = ClassUtils.forName("$DTO_PACKAGE_NAME.${entityName.firstToUpper()}Dto", null)
        return clazz
    }
}