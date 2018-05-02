package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.YEAR
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.BMSI2014_5A
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.BMSI2014_5C
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.INF2014_5G
import outcobra.server.data.loaders.SchoolClassDataLoader.Companion.INF2014_5K
import outcobra.server.model.domain.SchoolClass
import outcobra.server.model.domain.SchoolYear
import outcobra.server.model.repository.SchoolYearRepository
import java.time.LocalDate
import javax.inject.Inject

/**
 * This [DataLoader] loads our test [SchoolYear]s
 *
 * @author Joel Messerli
 * @since 1.1.0
 */
@Component
@Order(YEAR)
class YearDataLoader
@Inject constructor(val yearRepository: SchoolYearRepository) : DataLoader {
    companion object {
        lateinit var YEAR1: SchoolYear
        lateinit var YEAR2: SchoolYear
        lateinit var YEAR3: SchoolYear
        lateinit var YEAR4: SchoolYear
        lateinit var YEAR5: SchoolYear

        private val LOGGER = LoggerFactory.getLogger(YearDataLoader::class.java)
    }

    override fun shouldLoad() = true

    private fun saveYear(name: String, year: Int, schoolClass: SchoolClass): SchoolYear {
        val startDate = LocalDate.of(year, 8, 1)
        val endDate = LocalDate.of(year + 1, 7, 31)
        val schoolYear = SchoolYear(name, startDate, endDate, UserDataLoader.TEST_USER!!, mutableListOf(schoolClass), mutableListOf(), mutableListOf())

        LOGGER.debug("Saving schoolYear: ${schoolYear.name}")
        return yearRepository.save(schoolYear)
    }

    override fun load() {
        YEAR1 = saveYear("2016/17", 2016, INF2014_5G)
        YEAR2 = saveYear("2017/18", 2017, INF2014_5K)
        YEAR3 = saveYear("2018/19", 2018, BMSI2014_5A)
        YEAR4 = saveYear("2019/20", 2019, BMSI2014_5C)
        YEAR5 = saveYear("2016/17", 2016, INF2014_5K)
    }
}