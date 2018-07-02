package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.EXAM
import outcobra.server.data.loaders.MarkDataLoader.Companion.getRandomMark
import outcobra.server.data.loaders.MarkDataLoader.Companion.getRandomWeight
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.BMS5A_GUP_2018_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.BMS5A_MATHS_2018_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.BMS5C_GERMAN_2017_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.BMS5C_PHYSICS_2017_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5G_OOP_2016_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5G_OOP_DESIGN_2016_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5G_SCRUM_2016_1
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5K_DATABASES_2016_2
import outcobra.server.data.loaders.SchoolClassSemesterSubjectDataLoader.Companion.INF5K_PROJECT_2017_2
import outcobra.server.model.domain.Exam
import outcobra.server.model.domain.MarkValue
import outcobra.server.model.domain.SchoolClassSemesterSubject
import outcobra.server.model.repository.ExamRepository
import java.time.LocalDate
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Component
@Order(EXAM)
class ExamDataLoader @Inject constructor(val examRepository: ExamRepository) : DataLoader {
    companion object {
        private val LOGGER = LoggerFactory.getLogger(ExamDataLoader::class.java)

        lateinit var SCRUM_EXAM: Exam
        lateinit var OOP_EXAM: Exam
        lateinit var GERMAN_EXAM: Exam
        lateinit var PHYSICS_EXAM: Exam
        lateinit var OOP_DESIGN_EXAM: Exam
        lateinit var DATABASES_EXAM: Exam
        lateinit var GUP_EXAM: Exam
        lateinit var MATHS_EXAM: Exam
        lateinit var PROJECT_EXAM: Exam
    }

    override fun shouldLoad(): Boolean = true

    override fun load() {
        SCRUM_EXAM = saveAndLog("fake daily", INF5G_SCRUM_2016_1)
        OOP_EXAM = saveAndLog("KR", INF5G_OOP_2016_2)
        MATHS_EXAM = saveAndLog("Goniometrie", BMS5A_MATHS_2018_2)
        PROJECT_EXAM = saveAndLog("Präsentation", INF5K_PROJECT_2017_2)
        GUP_EXAM = saveAndLog("WW2", BMS5A_GUP_2018_1)
        PHYSICS_EXAM = saveAndLog("Statik", BMS5C_PHYSICS_2017_1)
        GERMAN_EXAM = saveAndLog("Kulturgeschichte", BMS5C_GERMAN_2017_1)
        OOP_DESIGN_EXAM = saveAndLog("Design-Patterns", INF5G_OOP_DESIGN_2016_2)
        DATABASES_EXAM = saveAndLog("SQL-Basics", INF5K_DATABASES_2016_2)
    }

    private fun saveAndLog(examName: String, schoolClassSemesterSubject: SchoolClassSemesterSubject): Exam {
        val exam = Exam(examName, LocalDate.now().minusWeeks(1), listOf(), schoolClassSemesterSubject, MarkValue(getRandomMark(), getRandomWeight()), "")


        val entity = examRepository.save(exam)
        LOGGER.debug("Saved exam: ${entity.name} with id ${entity.id}")
        return entity
    }
}
