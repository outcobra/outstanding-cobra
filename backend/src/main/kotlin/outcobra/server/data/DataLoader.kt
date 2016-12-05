package outcobra.server.data

import org.slf4j.LoggerFactory
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.*
import outcobra.server.model.repository.*
import java.time.LocalDate
import javax.inject.Inject

/**
 * Created by Florian on 27.11.2016.
 */
@Component
@Transactional
open class DataLoader @Inject constructor(val institutionRepository: InstitutionRepository,
                                          val schoolClassRepository: SchoolClassRepository,
                                          val schoolYearRepository: SchoolYearRepository,
                                          val semesterRepository: SemesterRepository,
                                          val subjectRepository: SubjectRepository,
                                          val userRepository: UserRepository) : ApplicationRunner {
    private val LOGGER = LoggerFactory.getLogger(DataLoader::class.java)

    companion object {
        val TEST_USER = User("auth0|583b1ac145cc13f8065da5e2", "OutcobraTest", arrayListOf())
        val INSTITUTION1 = Institution("IET-GIBB", TEST_USER)
        val INSTITUTION2 = Institution("BMS-GIBB", TEST_USER)
        val SCHOOLCLASS1 = SchoolClass("INF2014.5G", INSTITUTION1, arrayListOf())
        val SCHOOLCLASS2 = SchoolClass("INF2014.5K", INSTITUTION1, arrayListOf())
        val SCHOOLCLASS3 = SchoolClass("BMSI2014.5A", INSTITUTION2, arrayListOf())
        val SCHOOLCLASS4 = SchoolClass("BMSI2014.5C", INSTITUTION2, arrayListOf())
        val YEAR1 = SchoolYear("2016/17|1", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 7, 31), SCHOOLCLASS1, arrayListOf(), arrayListOf())
        val YEAR2 = SchoolYear("2016/17|2", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 7, 31), SCHOOLCLASS2, arrayListOf(), arrayListOf())
        val YEAR3 = SchoolYear("2016/17|3", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 7, 31), SCHOOLCLASS3, arrayListOf(), arrayListOf())
        val YEAR4 = SchoolYear("2016/17|14", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 7, 31), SCHOOLCLASS4, arrayListOf(), arrayListOf())
        val SEMESTER1 = Semester("1. Semester", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 1, 30), YEAR2, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER2 = Semester("1. Semester", LocalDate.of(2016, 8, 1), LocalDate.of(2017, 1, 30), YEAR3, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER3 = Semester("2. Semester", LocalDate.of(2017, 2, 1), LocalDate.of(2017, 7, 31), YEAR4, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SEMESTER4 = Semester("2. Semester", LocalDate.of(2016, 2, 1), LocalDate.of(2017, 7, 31), YEAR1, arrayListOf<Subject>(), arrayListOf<MarkReport>(), null)
        val SUBJECT1 = Subject("Scrum", SEMESTER1, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT2 = Subject("Kleinprojekt", SEMESTER2, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT3 = Subject("Math", SEMESTER3, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
        val SUBJECT4 = Subject("Deutsch", SEMESTER4, arrayListOf<TimetableEntry>(), arrayListOf<Task>(), arrayListOf(), arrayListOf<Exam>(), null, null)
    }

    override fun run(args: ApplicationArguments?) {
        userRepository.save(TEST_USER)
        listOf(INSTITUTION1, INSTITUTION2).map { institutionRepository.save(it) }
        listOf(SCHOOLCLASS1, SCHOOLCLASS2, SCHOOLCLASS3, SCHOOLCLASS4).map { schoolClassRepository.save(it) }
        listOf(YEAR1, YEAR2, YEAR3, YEAR4).map { schoolYearRepository.save(it) }
        listOf(SEMESTER1, SEMESTER2, SEMESTER3, SEMESTER4).map { semesterRepository.save(it) }
        listOf(SUBJECT1, SUBJECT2, SUBJECT4, SUBJECT3).map { subjectRepository.save(it) }
        LOGGER.info("Testdata loaded")
    }
}