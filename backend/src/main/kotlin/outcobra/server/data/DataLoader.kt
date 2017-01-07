package outcobra.server.data

import org.slf4j.LoggerFactory
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.core.Ordered
import org.springframework.core.PriorityOrdered
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.*
import outcobra.server.model.repository.*
import java.time.LocalDate
import java.util.*
import javax.inject.Inject

/**
 * DataLoader to load some mock data in to our database
 *
 * @author Florian Buergi
 * @since 1.0.0
 */
@Component
@Transactional
open class DataLoader @Inject constructor(val institutionRepository: InstitutionRepository,
                                          val schoolClassRepository: SchoolClassRepository,
                                          val schoolYearRepository: SchoolYearRepository,
                                          val semesterRepository: SemesterRepository,
                                          val subjectRepository: SubjectRepository,
                                          val userRepository: UserRepository) : ApplicationRunner, Ordered {
    companion object {

        val LOGGER = LoggerFactory.getLogger(DataLoader::class.java)
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
        val SEMESTER1 = Semester("1. Semester 16/17", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 1, 30), YEAR1, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER2 = Semester("1. Semester 17/18", LocalDate.of(2017, 8, 1), LocalDate.of(2018, 1, 30), YEAR2, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER3 = Semester("1. Semester 18/19", LocalDate.of(2018, 8, 1), LocalDate.of(2019, 1, 30), YEAR3, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER4 = Semester("1. Semester 19/20", LocalDate.of(2019, 8, 1), LocalDate.of(2020, 1, 30), YEAR4, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER5 = Semester("2. Semester 16/17", LocalDate.of(2017, 2, 1), LocalDate.of(2017, 7, 31), YEAR1, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER6 = Semester("2. Semester 17/18", LocalDate.of(2018, 2, 1), LocalDate.of(2018, 7, 31), YEAR2, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER7 = Semester("2. Semester 18/19", LocalDate.of(2019, 2, 1), LocalDate.of(2019, 7, 31), YEAR3, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER8 = Semester("2. Semester 19/20", LocalDate.of(2020, 2, 1), LocalDate.of(2020, 7, 31), YEAR4, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SUBJECT1 = Subject("Scrum", getRandomColor(), SEMESTER1, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT2 = Subject("Objektorientiert implementieren", getRandomColor(), SEMESTER2, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT3 = Subject("Geschichte und Politik", getRandomColor(), SEMESTER3, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT4 = Subject("Physik", getRandomColor(), SEMESTER4, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT5 = Subject("Objektorientiert entwerfen", getRandomColor(), SEMESTER5, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT6 = Subject("IT-Kleinprojekt", getRandomColor(), SEMESTER6, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT7 = Subject("Math", getRandomColor(), SEMESTER7, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT8 = Subject("Deutsch", getRandomColor(), SEMESTER8, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)

        fun getRandomColor(): Color {
            val rand = Random().nextInt(Color.values().size + 1)
            return Color.values()[rand]
        }
    }

    override fun run(args: ApplicationArguments?) {
        userRepository.save(TEST_USER)
        institutionRepository.save(listOf(INSTITUTION1, INSTITUTION2))
        schoolClassRepository.save(listOf(SCHOOL_CLASS1, SCHOOL_CLASS2, SCHOOL_CLASS3, SCHOOL_CLASS4))
        schoolYearRepository.save(listOf(YEAR1, YEAR2, YEAR3, YEAR4))
        semesterRepository.save(listOf(SEMESTER1, SEMESTER2, SEMESTER3, SEMESTER4, SEMESTER5, SEMESTER5, SEMESTER6, SEMESTER7, SEMESTER8))
        subjectRepository.save(listOf(SUBJECT1, SUBJECT2, SUBJECT4, SUBJECT3, SUBJECT5, SUBJECT6, SUBJECT7, SUBJECT8))
        LOGGER.info("Testdata loaded")
    }



    override fun getOrder(): Int {
        return PriorityOrdered.HIGHEST_PRECEDENCE
    }
}
