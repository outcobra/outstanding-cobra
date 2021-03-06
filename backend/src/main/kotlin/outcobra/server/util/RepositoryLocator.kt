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
import outcobra.server.exception.NoRepositoryFoundException
import outcobra.server.model.interfaces.OutcobraDto
import javax.inject.Inject
import javax.persistence.EntityNotFoundException

/**
 * Can be used to find instances of repositories by their entity's name or class
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
    private fun getForEntityName(entityName: String): JpaRepository<*, Long> {
        val repoName = entityName.decapitalize() + "Repository"
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
     * Returns the repository associated with the given class.
     *
     * @see getForEntityName
     * @throws NoRepositoryFoundException if the requested repository could not be found or has an illegal type
     * @since 1.0.0
     */
    @Cacheable(REPO_FOR_ENTITY, key = "#entityClass.getCanonicalName()")
    fun <T> getForEntityClass(entityClass: Class<T>): JpaRepository<T, Long> {
        @Suppress("UNCHECKED_CAST")
        return getForEntityName(entityClass.simpleName) as? JpaRepository<T, Long>
                ?: throw NoRepositoryFoundException("Could not cast repository to JpaRepository<${entityClass.simpleName}, Long>")
    }

    /**
     * Locates and returns a repository for the given dto.
     *
     * @param dto an instance of [OutcobraDto]
     * @return the matching [JpaRepository]
     * @since 1.0.0
     */
    @Cacheable(REPO_FOR_DTO, key = "#dto.class.getCanonicalName()")
    @Throws(EntityNotFoundException::class)
    fun getForDto(dto: OutcobraDto): JpaRepository<*, Long> {
        var name = dto.javaClass.simpleName
        name = name.replace("Dto", "")
        return this.getForEntityName(name)
    }
}