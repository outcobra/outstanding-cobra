package outcobra.server.util

import org.springframework.beans.BeansException
import org.springframework.beans.factory.BeanFactory
import org.springframework.beans.factory.NoSuchBeanDefinitionException
import org.springframework.context.ApplicationContext
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component
import javax.inject.Inject

/**
 * Can be used to find instances of repositories by their entitys name or class
 *
 * @author Joel Messerli
 * @since 1.0.0
 */
@Component
open class RepositoryLocator @Inject constructor(val context: ApplicationContext) {
    /**
     * Searches a [JpaRepository] bean using Spring's [ApplicationContext].
     * If you need a repository that already has the correct generic types see [getForEntityClass].
     *
     * @throws NoRepositoryFoundException if the requested repository could not be found
     * @see [BeanFactory.getBean]
     * @since 1.0.0
     */
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
    fun <T> getForEntityClass(entityClass: Class<T>): JpaRepository<T, Long> {
        @Suppress("UNCHECKED_CAST")
        return getForEntityName(entityClass.simpleName) as? JpaRepository<T, Long> ?: throw NoRepositoryFoundException("Could not cast repository to JpaRepository<${entityClass.simpleName}, Long>")
    }

    private fun String.firstToLower(): String {
        if (this.isNullOrEmpty()) return this
        return substring(0, 1).toLowerCase() + substring(1, length)
    }
}

/**
 * Is thrown when a repository can not be found or has an invalid type
 *
 * @author Joel Messerli
 * @since 1.0.0
 */
class NoRepositoryFoundException(message: String, cause: Throwable? = null) : Exception(message, cause)