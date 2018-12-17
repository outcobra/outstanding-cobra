package outcobra.server.data.loaders

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.TASK
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.BMS5A_GUP_2018_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.BMS5C_PHYSICS_2017_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5G_OOP_2016_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5G_SCRUM_2016_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5K_DATABASES_2016_2
import outcobra.server.model.domain.Task
import outcobra.server.model.repository.TaskRepository
import java.time.LocalDate

/**
 * This [DataLoader] loads our test [Task]s
 *
 * @author Joel Messerli
 * @since 1.1.0
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

    override fun count(): Long = taskRepository.count()

    private fun saveTask(task: Task): Task {
        LOGGER.debug("Saving task: ${task.name}")
        return taskRepository.save(task)
    }

    override fun load() {
        TASK1 = saveTask(Task("Retro Präsi", "Sprintretrospektive Präsentation vorbereiten", LocalDate.of(2017, 12, 22), LocalDate.of(2017, 12, 28), 12, 55, INF5G_SCRUM_2016_1))
        TASK2 = saveTask(Task("OOP", "Sequenzdiagramm zeichnen", LocalDate.of(2017, 10, 22), LocalDate.of(2017, 10, 28), 22, 15, INF5G_OOP_2016_2))
        TASK3 = saveTask(Task("WW2", "Dossier zum zweiten Weltkrieg fertiglesen", LocalDate.of(2017, 10, 22), LocalDate.of(2017, 10, 28), 22, 15, BMS5A_GUP_2018_1))
        TASK4 = saveTask(Task("Hebelgesetze", "AB Hebelgesetz machen", LocalDate.of(2017, 10, 22), LocalDate.of(2017, 10, 28), 22, 15, BMS5C_PHYSICS_2017_1))
        TASK5 = saveTask(Task("Burndown", "Burndown Chats analysieren", LocalDate.of(2017, 10, 22), LocalDate.of(2017, 10, 28), 22, 15, INF5G_SCRUM_2016_1))
        TASK6 = saveTask(Task("SQL", "AB SQL-Statements lösen", LocalDate.of(2017, 8, 22), LocalDate.of(2017, 8, 28), 32, 85, INF5K_DATABASES_2016_2))
        TASK7 = saveTask(Task("PostgreSQL", "PostrgeSQL RDBM kennelernen", LocalDate.of(2017, 6, 22), LocalDate.of(2017, 6, 28), 42, 25, INF5K_DATABASES_2016_2))
    }
}