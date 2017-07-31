package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.EXAM_TASK
import outcobra.server.data.loaders.ExamDataLoader.Companion.DATABASES_EXAM
import outcobra.server.data.loaders.ExamDataLoader.Companion.GERMAN_EXAM
import outcobra.server.data.loaders.ExamDataLoader.Companion.GUP_EXAM
import outcobra.server.data.loaders.ExamDataLoader.Companion.MATHS_EXAM
import outcobra.server.data.loaders.ExamDataLoader.Companion.OOP_DESIGN_EXAM
import outcobra.server.data.loaders.ExamDataLoader.Companion.OOP_EXAM
import outcobra.server.data.loaders.ExamDataLoader.Companion.PHYSICS_EXAM
import outcobra.server.data.loaders.ExamDataLoader.Companion.PROJECT_EXAM
import outcobra.server.data.loaders.ExamDataLoader.Companion.SCRUM_EXAM
import outcobra.server.model.ExamTask
import outcobra.server.model.repository.ExamTaskRepository
import java.util.Random
import javax.inject.Inject

/**
 *
 * @author Florian Bürgi
 * @since <since>
 */
@Component
@Order(EXAM_TASK)
class ExamTaskDataLoader @Inject constructor(val examTaskRepository: ExamTaskRepository) : DataLoader {
    private val LOGGER = LoggerFactory.getLogger(ExamTaskDataLoader::class.java)
    override fun shouldLoad(): Boolean = true

    override fun load() {
        listOf(SCRUM_EXAM, DATABASES_EXAM, OOP_DESIGN_EXAM, OOP_EXAM, PROJECT_EXAM,
                GUP_EXAM, MATHS_EXAM, PHYSICS_EXAM, GERMAN_EXAM).forEachIndexed { index, exam ->
            for (i in 0 until index) {
                val finished = Random().nextBoolean()
                var entity = ExamTask("${exam.name} #$i", exam, finished)
                entity = examTaskRepository.save(entity)
                LOGGER.debug("Saved ${entity.task} with id ${entity.id}")
            }
        }
    }

}
