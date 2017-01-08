package outcobra.server.data

import org.slf4j.LoggerFactory
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.core.Ordered
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoader
import outcobra.server.model.Task
import outcobra.server.model.repository.TaskRepository
import java.time.LocalDate

/**
 * @author Mario Kunz
 */
@Component
class TaskDataLoader(val taskRepository: TaskRepository) : ApplicationRunner, Ordered {
    companion object {
        val LOGGER = LoggerFactory.getLogger(DataLoader::class.java)

        val TASK1 = Task("Task1", "This is a desc", LocalDate.of(2016, 12, 22), LocalDate.of(2016, 12, 28), 12, 54, DataLoader.Companion.SUBJECT1)
        val TASK2 = Task("Task2", "This is a desc", LocalDate.of(2016, 10, 22), LocalDate.of(2016, 10, 28), 22, 14, DataLoader.Companion.SUBJECT2)
        val TASK3 = Task("Task3", "This is a desc", LocalDate.of(2016, 8, 22), LocalDate.of(2016, 8, 28), 32, 84, DataLoader.Companion.SUBJECT3)
        val TASK4 = Task("Task4", "This is a desc", LocalDate.of(2016, 6, 22), LocalDate.of(2016, 6, 28), 42, 24, DataLoader.Companion.SUBJECT4)
    }

    override fun run(args: ApplicationArguments?) {
        taskRepository.save(listOf(TASK1, TASK2, TASK3, TASK4))
        LOGGER.info("Loaded Tasks for TestUser")
    }

    override fun getOrder(): Int {
        return 1
    }
}