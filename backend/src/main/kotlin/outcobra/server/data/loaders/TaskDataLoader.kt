package outcobra.server.data.loaders

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.TASK
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT1
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT2
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT3
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT4
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SUBJECT9
import outcobra.server.model.Task
import outcobra.server.model.repository.TaskRepository
import java.time.LocalDate

/**
 * This [DataLoader] loads our test [Task]s
 *
 * @author Joel Messerli
 * @since <since>
 */
@Component
@Order(TASK)
class TaskDataLoader(val taskRepository: TaskRepository) : DataLoader {
    companion object {
        lateinit var TASK1: Task
        lateinit var TASK2: Task
        lateinit var TASK3: Task
        lateinit var TASK4: Task
        lateinit var TASK5: Task
        lateinit var TASK6: Task
        lateinit var TASK7: Task

        private val LOGGER: Logger = LoggerFactory.getLogger(TaskDataLoader::class.java)
    }

    override fun shouldLoad() = true

    private fun saveTask(task: Task): Task {
        LOGGER.debug("Saving task: ${task.name}")
        return taskRepository.save(task)!!
    }

    override fun load() {
        TASK1 = saveTask(Task("Retro Präsi", "Sprintretrospektive Präsentation vorbereiten", LocalDate.of(2016, 12, 22), LocalDate.of(2016, 12, 28), 12, 55, SUBJECT1))
        TASK2 = saveTask(Task("OOP", "Sequenzdiagramm zeichnen", LocalDate.of(2016, 10, 22), LocalDate.of(2016, 10, 28), 22, 15, SUBJECT2))
        TASK3 = saveTask(Task("WW2", "Dossier zum zweiten Weltkrieg fertiglesen", LocalDate.of(2016, 10, 22), LocalDate.of(2016, 10, 28), 22, 15, SUBJECT3))
        TASK4 = saveTask(Task("Hebelgesetze", "AB Hebelgesetz machen", LocalDate.of(2016, 10, 22), LocalDate.of(2016, 10, 28), 22, 15, SUBJECT4))
        TASK5 = saveTask(Task("Burndown", "Burndown Chats analysieren", LocalDate.of(2016, 10, 22), LocalDate.of(2016, 10, 28), 22, 15, SUBJECT1))
        TASK6 = saveTask(Task("SQL", "AB SQL-Statements lösen", LocalDate.of(2016, 8, 22), LocalDate.of(2016, 8, 28), 32, 85, SUBJECT9))
        TASK7 = saveTask(Task("PostgreSQL", "PostrgeSQL RDBM kennelernen", LocalDate.of(2016, 6, 22), LocalDate.of(2016, 6, 28), 42, 25, SUBJECT9))
    }
}