package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.SUBJECT
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.BMSI2014_5A
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.BMSI2014_5C
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.INF2014_5G
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.INF2014_5K
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2016_1
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2016_2
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2017_1
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2017_2
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2018_1
import outcobra.server.data.loaders.SemesterDataLoader.Companion.SEMESTER2018_2
import outcobra.server.model.domain.Color
import outcobra.server.model.domain.SchoolClass
import outcobra.server.model.domain.Semester
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

    private fun saveSubject(name: String, semesters: MutableList<Semester>, classes: MutableList<SchoolClass>): Subject {
        val subject = Subject(name, Color.randomColor, UserDataLoader.TEST_USER!!, semesters, classes, mutableListOf(), mutableListOf(), mutableListOf(), mutableListOf(), null, null)

        LOGGER.debug("Saving subject: ${subject.name}")
        return subjectRepository.save(subject)
    }

    override fun load() {
        SCRUM = saveSubject("Scrum", arrayListOf(SEMESTER2016_1), arrayListOf(INF2014_5G, INF2014_5K))
        OOP = saveSubject("Objektorientiert implementieren", arrayListOf(SEMESTER2016_2), arrayListOf(INF2014_5G, INF2014_5K))
        OOP_DESIGN = saveSubject("Objektorientiert entwerfen", arrayListOf(SEMESTER2016_2), arrayListOf(INF2014_5G, INF2014_5K))
        PROJECT = saveSubject("IT-Kleinprojekt", arrayListOf(SEMESTER2017_2), arrayListOf(INF2014_5K))
        DATABASES = saveSubject("Datenbanken", arrayListOf(SEMESTER2018_2), arrayListOf(INF2014_5K))

        PHYSICS = saveSubject("Physik", arrayListOf(SEMESTER2017_1), arrayListOf(BMSI2014_5C))
        GERMAN = saveSubject("Deutsch", arrayListOf(SEMESTER2017_1), arrayListOf(BMSI2014_5C))
        GUP = saveSubject("Geschichte und Politik", arrayListOf(SEMESTER2018_1), arrayListOf(BMSI2014_5A))
        MATHS = saveSubject("Math", arrayListOf(SEMESTER2018_2), arrayListOf(BMSI2014_5A))
    }
}