package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.SUBJECT
import outcobra.server.model.domain.Color
import outcobra.server.model.domain.Subject
import outcobra.server.model.repository.SubjectRepository
import javax.inject.Inject

/**
 * This [DataLoader] loads our test [Subject]s
 *
 * @author Joel Messerli
 * @since 1.1.0
 */
@Component
@Order(SUBJECT)
class SubjectDataLoader
@Inject constructor(val subjectRepository: SubjectRepository) : DataLoader {
    companion object {
        lateinit var SCRUM: Subject
        lateinit var OOP: Subject
        lateinit var GUP: Subject
        lateinit var PHYSICS: Subject
        lateinit var OOP_DESIGN: Subject
        lateinit var PROJECT: Subject
        lateinit var MATHS: Subject
        lateinit var GERMAN: Subject
        lateinit var DATABASES: Subject

        private val LOGGER = LoggerFactory.getLogger(SubjectDataLoader::class.java)
    }

    override fun shouldLoad() = true

    private fun saveSubject(name: String): Subject {
        val subject = Subject(name, Color.randomColor, UserDataLoader.TEST_USER!!, listOf(), null)

        LOGGER.debug("Saving subject: ${subject.name}")
        return subjectRepository.save(subject)
    }

    override fun load() {
        SCRUM = saveSubject("Scrum")
        OOP = saveSubject("Objektorientiert implementieren")
        OOP_DESIGN = saveSubject("Objektorientiert entwerfen")
        PROJECT = saveSubject("IT-Kleinprojekt")
        DATABASES = saveSubject("Datenbanken")

        PHYSICS = saveSubject("Physik")
        GERMAN = saveSubject("Deutsch")
        GUP = saveSubject("Geschichte und Politik")
        MATHS = saveSubject("Math")
    }
}