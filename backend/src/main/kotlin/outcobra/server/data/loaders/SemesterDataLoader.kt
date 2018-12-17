package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.SEMESTER
import outcobra.server.data.loaders.YearDataLoader.Companion.YEAR1
import outcobra.server.data.loaders.YearDataLoader.Companion.YEAR2
import outcobra.server.data.loaders.YearDataLoader.Companion.YEAR3
import outcobra.server.model.domain.SchoolYear
import outcobra.server.model.domain.Semester
import outcobra.server.model.repository.SemesterRepository
import java.time.LocalDate
import java.time.temporal.TemporalAdjusters.lastDayOfMonth
import javax.inject.Inject

/**
 * This [DataLoader] loads our test [Semester]s
 *
 * @author Joel Messerli
 * @since 1.1.0
 */
@Component
@Order(SEMESTER)
class SemesterDataLoader
@Inject constructor(val semesterRepository: SemesterRepository) : DataLoader {
    companion object {
        lateinit var SEMESTER2016_1: Semester
        lateinit var SEMESTER2017_1: Semester
        lateinit var SEMESTER2018_1: Semester
        lateinit var SEMESTER2016_2: Semester
        lateinit var SEMESTER2017_2: Semester
        lateinit var SEMESTER2018_2: Semester

        private val LOGGER = LoggerFactory.getLogger(SemesterDataLoader::class.java)
    }

    override fun count(): Long = semesterRepository.count()

    private fun saveSemester(name: String, startDate: LocalDate, schoolYear: SchoolYear): Semester {
        val endDate = startDate.plusMonths(5).with(lastDayOfMonth())
        val semester = Semester(name, startDate, endDate, schoolYear, mutableListOf(), null)

        LOGGER.debug("Saving semester: ${semester.name}")
        return semesterRepository.save(semester)
    }

    override fun load() {
        SEMESTER2016_1 = saveSemester("1. Semester 16/17", LocalDate.of(2016, 8, 1), YEAR1)
        SEMESTER2016_2 = saveSemester("2. Semester 16/17", LocalDate.of(2017, 2, 1), YEAR1)
        SEMESTER2017_1 = saveSemester("1. Semester 17/18", LocalDate.of(2017, 8, 1), YEAR2)
        SEMESTER2017_2 = saveSemester("2. Semester 17/18", LocalDate.of(2018, 2, 1), YEAR2)
        SEMESTER2018_1 = saveSemester("1. Semester 18/19", LocalDate.of(2018, 8, 1), YEAR3)
        SEMESTER2018_2 = saveSemester("2. Semester 18/19", LocalDate.of(2019, 2, 1), YEAR3)
    }
}