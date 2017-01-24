package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.SEMESTER
import outcobra.server.data.loaders.YearDataLoader.Companion.YEAR1
import outcobra.server.data.loaders.YearDataLoader.Companion.YEAR2
import outcobra.server.data.loaders.YearDataLoader.Companion.YEAR3
import outcobra.server.data.loaders.YearDataLoader.Companion.YEAR4
import outcobra.server.data.loaders.YearDataLoader.Companion.YEAR5
import outcobra.server.model.SchoolYear
import outcobra.server.model.Semester
import outcobra.server.model.repository.SemesterRepository
import java.time.LocalDate
import java.time.temporal.TemporalAdjusters.lastDayOfMonth
import javax.inject.Inject

/**
 * This [DataLoader] loads our test [Semester]s
 *
 * @author Joel Messerli
 * @since <since>
 */
@Component
@Order(SEMESTER)
class SemesterDataLoader
@Inject constructor(val semesterRepository: SemesterRepository) : DataLoader {
    companion object {
        lateinit var SEMESTER1: Semester
        lateinit var SEMESTER2: Semester
        lateinit var SEMESTER3: Semester
        lateinit var SEMESTER4: Semester
        lateinit var SEMESTER5: Semester
        lateinit var SEMESTER6: Semester
        lateinit var SEMESTER7: Semester
        lateinit var SEMESTER8: Semester
        lateinit var SEMESTER9: Semester

        private val LOGGER = LoggerFactory.getLogger(SemesterDataLoader::class.java)
    }

    override fun shouldLoad() = true

    private fun saveSemester(name: String, startDate: LocalDate, schoolYear: SchoolYear): Semester {
        val endDate = startDate.plusMonths(5).with(lastDayOfMonth())
        val semester = Semester(name, startDate, endDate, schoolYear, mutableListOf(), mutableListOf(), null)

        LOGGER.debug("Saving semester: ${semester.name}")
        return semesterRepository.save(semester)!!
    }

    override fun load() {
        SEMESTER1 = saveSemester("1. Semester 16/17", LocalDate.of(2016, 8, 1), YEAR1)
        SEMESTER2 = saveSemester("1. Semester 17/18", LocalDate.of(2017, 8, 1), YEAR2)
        SEMESTER3 = saveSemester("1. Semester 18/19", LocalDate.of(2018, 8, 1), YEAR3)
        SEMESTER4 = saveSemester("1. Semester 19/20", LocalDate.of(2019, 8, 1), YEAR4)
        SEMESTER5 = saveSemester("2. Semester 16/17", LocalDate.of(2017, 2, 1), YEAR1)
        SEMESTER6 = saveSemester("2. Semester 17/18", LocalDate.of(2018, 2, 1), YEAR2)
        SEMESTER7 = saveSemester("2. Semester 18/19", LocalDate.of(2019, 2, 1), YEAR3)
        SEMESTER8 = saveSemester("2. Semester 19/20", LocalDate.of(2020, 2, 1), YEAR4)
        SEMESTER9 = saveSemester("1. Semester 16/17", LocalDate.of(2016, 8, 1), YEAR5)
    }
}