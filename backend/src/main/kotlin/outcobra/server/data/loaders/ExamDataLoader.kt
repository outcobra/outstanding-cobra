package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.EXAM
import outcobra.server.data.loaders.MarkDataLoader.Companion.getRandomMark
import outcobra.server.data.loaders.MarkDataLoader.Companion.getRandomWeight
import outcobra.server.data.loaders.SchoolClassSubjectSemesterDataLoader.Companion.BM5A_GUP_2018_1
import outcobra.server.data.loaders.SchoolClassSubjectSemesterDataLoader.Companion.BM5A_MATHS_2018_2
import outcobra.server.data.loaders.SchoolClassSubjectSemesterDataLoader.Companion.BMS5C_PHYSICS_2017_1
import outcobra.server.data.loaders.SchoolClassSubjectSemesterDataLoader.Companion.INF5G_OOP_2016_2
import outcobra.server.data.loaders.SchoolClassSubjectSemesterDataLoader.Companion.INF5G_OOP_DESIGN_2016_2
import outcobra.server.data.loaders.SchoolClassSubjectSemesterDataLoader.Companion.INF5G_SCRUM_2016_1
import outcobra.server.data.loaders.SchoolClassSubjectSemesterDataLoader.Companion.INF5K_DATABASES_2016_2
import outcobra.server.data.loaders.SchoolClassSubjectSemesterDataLoader.Companion.INF5K_PROJECT_2017_2
import outcobra.server.model.domain.Exam
import outcobra.server.model.domain.MarkValue
import outcobra.server.model.domain.SchoolClassSubjectSemester
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

        var SCRUM_EXAM = Exam("fake daily", LocalDate.now().minusWeeks(1), listOf(),
                null, MarkValue(getRandomMark(), getRandomWeight(), null, ""), "")
        var OOP_EXAM = Exam("KR", LocalDate.now().plusWeeks(1), listOf(),
                null, null)
        var GERMAN_EXAM = Exam("Kulturgeschichte", LocalDate.now().minusWeeks(1), listOf(),
                null, MarkValue(getRandomMark(), getRandomWeight(), null, ""), "")
        var PHYSICS_EXAM = Exam("Statik", LocalDate.now().minusWeeks(1), listOf(),
                null, MarkValue(getRandomMark(), getRandomWeight(), null, ""), "")
        var OOP_DESIGN_EXAM = Exam("Design-Patterns", LocalDate.now().plusWeeks(1), listOf(),
                null, null)
        var DATABASES_EXAM = Exam("DB-Project", LocalDate.now(), listOf(),
                null, MarkValue(getRandomMark(), getRandomWeight(), null, ""), "")
        var GUP_EXAM = Exam("WW2", LocalDate.now().minusWeeks(1), listOf(),
                null, MarkValue(getRandomMark(), getRandomWeight(), null, ""), "")
        var MATHS_EXAM = Exam("Goniometrie", LocalDate.now().plusDays(1), listOf(),
                null, null)
        var PROJECT_EXAM = Exam("Präsentation", LocalDate.now().minusMonths(1), listOf(),
                null, MarkValue(getRandomMark(), getRandomWeight(), null, ""), "")
    }

    override fun shouldLoad(): Boolean = true

    override fun load() {
        SCRUM_EXAM = saveAndLog(SCRUM_EXAM, INF5G_SCRUM_2016_1)
        OOP_EXAM = saveAndLog(OOP_EXAM, INF5G_OOP_2016_2)
        MATHS_EXAM = saveAndLog(MATHS_EXAM, BM5A_MATHS_2018_2)
        PROJECT_EXAM = saveAndLog(PROJECT_EXAM, INF5K_PROJECT_2017_2)
        GUP_EXAM = saveAndLog(GUP_EXAM, BM5A_GUP_2018_1)
        PHYSICS_EXAM = saveAndLog(PHYSICS_EXAM, BMS5C_PHYSICS_2017_1)
        GERMAN_EXAM = saveAndLog(GERMAN_EXAM, INF5K_DATABASES_2016_2)
        OOP_DESIGN_EXAM = saveAndLog(OOP_DESIGN_EXAM, INF5G_OOP_DESIGN_2016_2)
    }

    private fun saveAndLog(exam: Exam, schoolClassSubjectSemester: SchoolClassSubjectSemester): Exam {
        exam.schoolClassSubjectSemester = schoolClassSubjectSemester
        val entity = examRepository.save(exam)
        LOGGER.debug("Saved exam: ${entity.name} with id ${entity.id}")
        return entity
    }
}
