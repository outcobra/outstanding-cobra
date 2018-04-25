package outcobra.server.data.loaders

import org.slf4j.LoggerFactory
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import outcobra.server.data.DataLoadOrder.INSTITUTION
import outcobra.server.model.domain.Institution
import outcobra.server.model.repository.InstitutionRepository
import javax.inject.Inject

/**
 * This [DataLoader] loads our test [Institution]s
 *
 * @author Joel Messerli
 * @since 1.1.0
 */
@Component
@Order(INSTITUTION)
class InstitutionDataLoader
@Inject constructor(val institutionRepository: InstitutionRepository) : DataLoader {
    companion object {
        lateinit var IET_GIBB: Institution
        lateinit var BMS_GIBB: Institution

        private val LOGGER = LoggerFactory.getLogger(InstitutionDataLoader::class.java)
    }

    override fun shouldLoad() = true

    private fun saveInstitution(institution: Institution): Institution {
        LOGGER.debug("Saving institution: ${institution.name}")
        return institutionRepository.save(institution)
    }

    override fun load() {
        IET_GIBB = saveInstitution(Institution("IET-GIBB", UserDataLoader.TEST_USER))
        BMS_GIBB = saveInstitution(Institution("BMS-GIBB", UserDataLoader.TEST_USER))
    }
}