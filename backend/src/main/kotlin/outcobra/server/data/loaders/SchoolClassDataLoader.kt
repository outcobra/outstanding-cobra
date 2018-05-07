package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.SCHOOL_CLASS
import outcobra.server.data.loaders.InstitutionDataLoader.Companion.BMS_GIBB
import outcobra.server.data.loaders.InstitutionDataLoader.Companion.IET_GIBB
import outcobra.server.model.domain.Institution
import outcobra.server.model.domain.SchoolClass
import outcobra.server.model.repository.SchoolClassRepository
import javax.inject.Inject

/**
 * This [DataLoader] loads our test [SchoolClass]es
 *
 * @author Joel Messerli
 * @since 1.1.0
 */
@Component
@Order(SCHOOL_CLASS)
class SchoolClassDataLoader
@Inject constructor(val schoolClassRepository: SchoolClassRepository) : DataLoader {
    companion object {
        lateinit var INF2014_5G: SchoolClass
        lateinit var INF2014_5K: SchoolClass
        lateinit var BMSI2014_5A: SchoolClass
        lateinit var BMSI2014_5C: SchoolClass

        private val LOGGER = LoggerFactory.getLogger(SchoolClassDataLoader::class.java)
    }

    override fun shouldLoad() = true

    private fun saveSchoolClass(normalizedName: String, institution: Institution): SchoolClass {
        val schoolClass = SchoolClass(normalizedName, institution)

        LOGGER.debug("Saving schoolClass: ${schoolClass.normalizedName}")
        return schoolClassRepository.save(schoolClass)
    }

    override fun load() {
        INF2014_5G = saveSchoolClass("INF2014.5G", IET_GIBB)
        INF2014_5K = saveSchoolClass("INF2014.5K", IET_GIBB)
        BMSI2014_5A = saveSchoolClass("BMSI2014.5A", BMS_GIBB)
        BMSI2014_5C = saveSchoolClass("BMSI2014.5C", BMS_GIBB)
    }
}