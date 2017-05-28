package outcobra.server.util

import org.springframework.beans.BeansException
import org.springframework.beans.factory.BeanFactory
import org.springframework.beans.factory.NoSuchBeanDefinitionException
import org.springframework.cache.annotation.Cacheable
import org.springframework.context.ApplicationContext
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component
import outcobra.server.config.CacheRegistry.Companion.REPO_FOR_DTO
import outcobra.server.config.CacheRegistry.Companion.REPO_FOR_ENTITY
import outcobra.server.config.CacheRegistry.Companion.REPO_FOR_NAME
import outcobra.server.exception.NoRepositoryFoundException
import outcobra.server.model.interfaces.OutcobraDto
import javax.inject.Inject

/**
 * Can be used to find instances of repositories by their entitys name or class
 *
 * @author Joel Messerli
 * @since 1.0.0
 */
@Component
class RepositoryLocator @Inject constructor(val context: ApplicationContext) {
    /**
     * Searches a [JpaRepository] bean using Spring's [ApplicationContext].
     * If you need a repository that already has the correct generic types see [getForEntityClass].
     *
     * @throws NoRepositoryFoundException if the requested repository could not be found
     * @see [BeanFactory.getBean]
     * @since 1.0.0
     */
    @Cacheable(REPO_FOR_NAME, key = "entityName")
    fun getForEntityName(entityName: String): JpaRepository<*, Long> {
        val repoName = entityName.firstToLower() + "Repository"
        try {
            @Suppress("UNCHECKED_CAST")
            val repoBean = context.getBean(repoName) as? JpaRepository<*, Long>
                    ?: throw NoRepositoryFoundException("Bean with name $repoName is not a JpaRepository<*, Long>")
            return repoBean
        } catch (e: NoSuchBeanDefinitionException) {
            throw NoRepositoryFoundException("There is no repository for $entityName (tried $repoName)", e)
        } catch (e: BeansException) {
            throw NoRepositoryFoundException("Could not construct bean $repoName", e)
        }
    }

    /**
     * This is a helper to access [getForEntityName] via a class. Automatically casts the repository to the requested type.
     *
     * @see getForEntityName
     * @throws NoRepositoryFoundException if the requested repository could not be found or has an illegal type
     * @since 1.0.0
     */
    @Cacheable(REPO_FOR_ENTITY, key = "#entityClass.getSimpleName()")
    fun <T> getForEntityClass(entityClass: Class<T>): JpaRepository<T, Long> {
        @Suppress("UNCHECKED_CAST")
        return getForEntityName(entityClass.simpleName) as? JpaRepository<T, Long>
                ?: throw NoRepositoryFoundException("Could not cast repository to JpaRepository<${entityClass.simpleName}, Long>")
    }

    /**
     * This function locates the repository for the given Dto
     * @param dto an instance of [OutcobraDto]
     * @return the matching [JpaRepository]
     * @since 1.0.0
     */
    @Cacheable(REPO_FOR_DTO, key = "#dto.class.getSimpleName()")
    fun getForDto(dto: OutcobraDto): JpaRepository<*, Long> {
        var name = dto.javaClass.simpleName
        name = name.replace("Dto", "")
        return this.getForEntityName(name)
    }
}