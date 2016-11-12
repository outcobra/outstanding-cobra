package outcobra.server.util

import org.springframework.beans.BeansException
import org.springframework.beans.factory.NoSuchBeanDefinitionException
import org.springframework.context.ApplicationContext
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Component
import javax.inject.Inject

@Component
class RepositoryLocator @Inject constructor(val context: ApplicationContext) {
    /**
     * @throws NoRepositoryFoundException if the requested repository could not be found
     */
    fun getForEntityName(entityName: String): JpaRepository<*, Long> {
        val repoName = entityName + "Repository"

        try {
            val repoBean = context.getBean(repoName) as? JpaRepository<*, Long>
                    ?: throw NoRepositoryFoundException("Bean with name $repoName is not a JpaRepository<*, Long>")
            return repoBean
        } catch (e: NoSuchBeanDefinitionException) {
            throw NoRepositoryFoundException("There is no repository for $entityName (tried $repoName)", e)
        } catch (e: BeansException) {
            throw NoRepositoryFoundException("Could not construct bean $repoName", e)
        }
    }

    fun <T> getForEntityClass(entityClass: Class<T>): JpaRepository<T, Long> {
        return getForEntityName(entityClass.simpleName) as JpaRepository<T, Long>
    }
}

class NoRepositoryFoundException(message: String, cause: Throwable? = null) : Exception(message, cause)