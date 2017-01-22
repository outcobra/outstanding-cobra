package outcobra.server.data

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.model.Task
import outcobra.server.model.repository.TaskRepository
import java.time.LocalDate

/**
 * Loads a set of tasks in to the database on Application start
 *
 * @author Mario Kunz
 * @since <since>
 */
@Component
@Order(DataLoadOrder.TASK_DATALOADER)
class TaskDataLoader(val taskRepository: TaskRepository) : DataLoader {
    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(DefaultDataloader::class.java)

        val TASK1 = Task("Retro Präsi", "Sprintretrospektive Präsentation vorbereiten", LocalDate.of(2016, 12, 22), LocalDate.of(2016, 12, 28), 12, 55, DefaultDataloader.Companion.SUBJECT1)
        val TASK2 = Task("OOP", "Sequenzdiagramm zeichnen", LocalDate.of(2016, 10, 22), LocalDate.of(2016, 10, 28), 22, 15, DefaultDataloader.Companion.SUBJECT2)
        val TASK3 = Task("WW2", "Dossier zum zweiten Weltkrieg fertiglesen", LocalDate.of(2016, 10, 22), LocalDate.of(2016, 10, 28), 22, 15, DefaultDataloader.Companion.SUBJECT3)
        val TASK4 = Task("Hebelgesetze", "AB Hebelgesetz machen", LocalDate.of(2016, 10, 22), LocalDate.of(2016, 10, 28), 22, 15, DefaultDataloader.Companion.SUBJECT4)
        val TASK5 = Task("Burndown", "Burndown Chats analysieren", LocalDate.of(2016, 10, 22), LocalDate.of(2016, 10, 28), 22, 15, DefaultDataloader.Companion.SUBJECT1)
        val TASK6 = Task("SQL", "AB SQL-Statements lösen", LocalDate.of(2016, 8, 22), LocalDate.of(2016, 8, 28), 32, 85, DefaultDataloader.Companion.SUBJECT9)
        val TASK7 = Task("PostgreSQL", "PostrgeSQL RDBM kennelernen", LocalDate.of(2016, 6, 22), LocalDate.of(2016, 6, 28), 42, 25, DefaultDataloader.Companion.SUBJECT9)
    }

    override fun shouldLoad() = true

    override fun load() {
        taskRepository.save(listOf(TASK1, TASK2, TASK3, TASK4, TASK5, TASK6, TASK7))
        LOGGER.info("Loaded Tasks for TestUser")
    }
}