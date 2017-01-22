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
 * @since <since>
 */
@Component
@Order(SUBJECT)
class SubjectDataLoader
@Inject constructor(val subjectRepository: SubjectRepository) : DataLoader {
    companion object {
        lateinit var SUBJECT1: Subject
        lateinit var SUBJECT2: Subject
        lateinit var SUBJECT3: Subject
        lateinit var SUBJECT4: Subject
        lateinit var SUBJECT5: Subject
        lateinit var SUBJECT6: Subject
        lateinit var SUBJECT7: Subject
        lateinit var SUBJECT8: Subject
        lateinit var SUBJECT9: Subject

        private val LOGGER = LoggerFactory.getLogger(SubjectDataLoader::class.java)
    }

    override fun shouldLoad() = true

    private fun saveSubject(name: String, semester: Semester): Subject {
        val subject = Subject(name, Color.getRandomColor(), semester, mutableListOf(), mutableListOf(), mutableListOf(), mutableListOf(), null, null)

        LOGGER.debug("Saving subject: ${subject.name}")
        return subjectRepository.save(subject)!!
    }

    override fun load() {
        SUBJECT1 = saveSubject("Scrum", SemesterDataLoader.SEMESTER1)
        SUBJECT2 = saveSubject("Objektorientiert implementieren", SemesterDataLoader.SEMESTER2)
        SUBJECT3 = saveSubject("Geschichte und Politik", SemesterDataLoader.SEMESTER3)
        SUBJECT4 = saveSubject("Physik", SemesterDataLoader.SEMESTER4)
        SUBJECT5 = saveSubject("Objektorientiert entwerfen", SemesterDataLoader.SEMESTER5)
        SUBJECT6 = saveSubject("IT-Kleinprojekt", SemesterDataLoader.SEMESTER6)
        SUBJECT7 = saveSubject("Math", SemesterDataLoader.SEMESTER7)
        SUBJECT8 = saveSubject("Deutsch", SemesterDataLoader.SEMESTER8)
        SUBJECT9 = saveSubject("Datenbanken", SemesterDataLoader.SEMESTER9)
    }
}