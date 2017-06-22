package outcobra.server.config

/**
 * This class contains constants for all cache-names used in this app
 * @author Florian Bürgi
 * @since 1.1.0
 */
class CacheRegistry {
    companion object {
        const val REPO_FOR_NAME = "repo_for_name"
        const val REPO_FOR_ENTITY = "repo_for_entity"
        const val REPO_FOR_DTO = "repo_for_dto"
        const val DTO_FOR_NAME = "dto_for_name"
    }
}