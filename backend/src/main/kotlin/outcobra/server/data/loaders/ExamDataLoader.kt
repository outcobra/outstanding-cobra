package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.EXAM
import outcobra.server.data.loaders.MarkDataLoader.Companion.getRandomMark
import outcobra.server.data.loaders.MarkDataLoader.Companion.getRandomWeight
import outcobra.server.data.loaders.SubjectDataLoader.Companion.DATABASES
import outcobra.server.data.loaders.SubjectDataLoader.Companion.GERMAN
import outcobra.server.data.loaders.SubjectDataLoader.Companion.GUP
import outcobra.server.data.loaders.SubjectDataLoader.Companion.MATHS
import outcobra.server.data.loaders.SubjectDataLoader.Companion.OOP
import outcobra.server.data.loaders.SubjectDataLoader.Companion.OOP_DESIGN
import outcobra.server.data.loaders.SubjectDataLoader.Companion.PHYSICS
import outcobra.server.data.loaders.SubjectDataLoader.Companion.PROJECT
import outcobra.server.data.loaders.SubjectDataLoader.Companion.SCRUM
import outcobra.server.model.Exam
import outcobra.server.model.Mark
import outcobra.server.model.MarkValue
import outcobra.server.model.Subject
import outcobra.server.model.repository.ExamRepository
import outcobra.server.model.repository.MarkValueRepository
import java.time.LocalDate
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@Component
@Order(EXAM)
class ExamDataLoader @Inject constructor(val examRepository: ExamRepository,
                                         val markValueRepository: MarkValueRepository) : DataLoader {
    private val LOGGER = LoggerFactory.getLogger(ExamDataLoader::class.java)

    companion object {
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
        SCRUM_EXAM = saveAndLog(SCRUM_EXAM, SCRUM)
        OOP_EXAM = saveAndLog(OOP_EXAM, OOP)
        MATHS_EXAM = saveAndLog(MATHS_EXAM, MATHS)
        PROJECT_EXAM = saveAndLog(PROJECT_EXAM, PROJECT)
        GUP_EXAM = saveAndLog(GUP_EXAM, GUP)
        PHYSICS_EXAM = saveAndLog(PHYSICS_EXAM, PHYSICS)
        GERMAN_EXAM = saveAndLog(GERMAN_EXAM, GERMAN)
        DATABASES_EXAM = saveAndLog(DATABASES_EXAM, DATABASES)
        OOP_DESIGN_EXAM = saveAndLog(OOP_DESIGN_EXAM, OOP_DESIGN)
    }

    private fun saveAndLog(exam: Exam, subject: Subject): Exam {
        exam.subject = subject
        exam.mark?.markGroup = subject.markGroup
        /*if (exam.mark is Mark) { WTF
            exam.mark = markValueRepository.save(exam.mark)
        }*/
        val entity = examRepository.save(exam)
        LOGGER.debug("Saved exam: ${entity.name} with id ${entity.id}")
        return entity
    }
}
