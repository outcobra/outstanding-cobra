package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.SUBJECT
import outcobra.server.model.Color
import outcobra.server.model.Semester
import outcobra.server.model.Subject
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

    private fun saveSubject(name: String, semester: Semester): Subject {
        val subject = Subject(name, Color.randomColor, semester, mutableListOf(), mutableListOf(), mutableListOf(), mutableListOf(), null, null)

        LOGGER.debug("Saving subject: ${subject.name}")
        return subjectRepository.save(subject)
    }

    override fun load() {
        SCRUM = saveSubject("Scrum", SemesterDataLoader.SEMESTER1)
        OOP = saveSubject("Objektorientiert implementieren", SemesterDataLoader.SEMESTER2)
        GUP = saveSubject("Geschichte und Politik", SemesterDataLoader.SEMESTER3)
        PHYSICS = saveSubject("Physik", SemesterDataLoader.SEMESTER4)
        OOP_DESIGN = saveSubject("Objektorientiert entwerfen", SemesterDataLoader.SEMESTER5)
        PROJECT = saveSubject("IT-Kleinprojekt", SemesterDataLoader.SEMESTER6)
        MATHS = saveSubject("Math", SemesterDataLoader.SEMESTER7)
        GERMAN = saveSubject("Deutsch", SemesterDataLoader.SEMESTER8)
        DATABASES = saveSubject("Datenbanken", SemesterDataLoader.SEMESTER9)
    }
}