package outcobra.server.data

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.*
import outcobra.server.model.repository.*
import java.time.LocalDate
import javax.inject.Inject

/**
 * DefaultDataloader to load some mock data in to our database
 *
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
@Transactional
@Order(DataLoadOrder.DEFAULT_DATALOADER)
open class DefaultDataloader
@Inject constructor(val institutionRepository: InstitutionRepository,
                    val schoolClassRepository: SchoolClassRepository,
                    val schoolYearRepository: SchoolYearRepository,
                    val semesterRepository: SemesterRepository,
                    val subjectRepository: SubjectRepository,
                    val userRepository: UserRepository) : DataLoader {

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(DefaultDataloader::class.java)
        val TEST_USER = User("auth0|583b1ac145cc13f8065da5e2", "OutcobraTest", arrayListOf())

        val INSTITUTION1 = Institution("IET-GIBB", TEST_USER)
        val INSTITUTION2 = Institution("BMS-GIBB", TEST_USER)
        val SCHOOL_CLASS1 = SchoolClass("INF2014.5G", INSTITUTION1, arrayListOf())
        val SCHOOL_CLASS2 = SchoolClass("INF2014.5K", INSTITUTION1, arrayListOf())
        val SCHOOL_CLASS3 = SchoolClass("BMSI2014.5A", INSTITUTION2, arrayListOf())
        val SCHOOL_CLASS4 = SchoolClass("BMSI2014.5C", INSTITUTION2, arrayListOf())
        val YEAR1 = SchoolYear("2016/17", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 7, 31), SCHOOL_CLASS1, arrayListOf(), arrayListOf())
        val YEAR2 = SchoolYear("2017/18", LocalDate.of(2017, 8, 1), LocalDate.of(2018, 7, 31), SCHOOL_CLASS2, arrayListOf(), arrayListOf())
        val YEAR3 = SchoolYear("2018/19", LocalDate.of(2018, 8, 1), LocalDate.of(2019, 7, 31), SCHOOL_CLASS3, arrayListOf(), arrayListOf())
        val YEAR4 = SchoolYear("2019/20", LocalDate.of(2019, 8, 1), LocalDate.of(2020, 7, 31), SCHOOL_CLASS4, arrayListOf(), arrayListOf())
        val YEAR5 = SchoolYear("2016/17", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 7, 31), SCHOOL_CLASS2, arrayListOf(), arrayListOf())
        val SEMESTER1 = Semester("1. Semester 16/17", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 1, 30), YEAR1, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER2 = Semester("1. Semester 17/18", LocalDate.of(2017, 8, 1), LocalDate.of(2018, 1, 30), YEAR2, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER3 = Semester("1. Semester 18/19", LocalDate.of(2018, 8, 1), LocalDate.of(2019, 1, 30), YEAR3, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER4 = Semester("1. Semester 19/20", LocalDate.of(2019, 8, 1), LocalDate.of(2020, 1, 30), YEAR4, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER5 = Semester("2. Semester 16/17", LocalDate.of(2017, 2, 1), LocalDate.of(2017, 7, 31), YEAR1, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER6 = Semester("2. Semester 17/18", LocalDate.of(2018, 2, 1), LocalDate.of(2018, 7, 31), YEAR2, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER7 = Semester("2. Semester 18/19", LocalDate.of(2019, 2, 1), LocalDate.of(2019, 7, 31), YEAR3, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER8 = Semester("2. Semester 19/20", LocalDate.of(2020, 2, 1), LocalDate.of(2020, 7, 31), YEAR4, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER9 = Semester("1. Semester 16/17", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 1, 30), YEAR5, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SUBJECT1 = Subject("Scrum", Color.getRandomColor(), SEMESTER1, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT2 = Subject("Objektorientiert implementieren", Color.getRandomColor(), SEMESTER2, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT3 = Subject("Geschichte und Politik", Color.getRandomColor(), SEMESTER3, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT4 = Subject("Physik", Color.getRandomColor(), SEMESTER4, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT5 = Subject("Objektorientiert entwerfen", Color.getRandomColor(), SEMESTER5, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT6 = Subject("IT-Kleinprojekt", Color.getRandomColor(), SEMESTER6, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT7 = Subject("Math", Color.getRandomColor(), SEMESTER7, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT8 = Subject("Deutsch", Color.getRandomColor(), SEMESTER8, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT9 = Subject("Datenbanken", Color.getRandomColor(), SEMESTER9, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
    }

    override fun shouldLoad() = true

    override fun load() {
        userRepository.save(TEST_USER)
        institutionRepository.save(listOf(INSTITUTION1, INSTITUTION2))
        schoolClassRepository.save(listOf(SCHOOL_CLASS1, SCHOOL_CLASS2, SCHOOL_CLASS3, SCHOOL_CLASS4))
        schoolYearRepository.save(listOf(YEAR1, YEAR2, YEAR3, YEAR4, YEAR5))
        semesterRepository.save(listOf(SEMESTER1, SEMESTER2, SEMESTER3, SEMESTER4, SEMESTER5, SEMESTER5, SEMESTER6, SEMESTER7, SEMESTER8, SEMESTER9))
        subjectRepository.save(listOf(SUBJECT1, SUBJECT2, SUBJECT4, SUBJECT3, SUBJECT5, SUBJECT6, SUBJECT7, SUBJECT8, SUBJECT9))
        LOGGER.info("Testdata loaded")
    }
}
