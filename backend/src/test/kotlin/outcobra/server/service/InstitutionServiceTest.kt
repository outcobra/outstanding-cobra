package outcobra.server.service

import org.junit.Assert
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import outcobra.server.ProfileRegistry
import outcobra.server.model.QInstitution
import outcobra.server.model.repository.InstitutionRepository

@RunWith(SpringRunner::class)
@SpringBootTest
@ActiveProfiles(ProfileRegistry.PROFILE_MOCK_SERVICES)
class InstitutionServiceTest {

    @Autowired
    lateinit var institutionService: InstitutionService
    @Autowired
    lateinit var institutionRepository: InstitutionRepository

    companion object {
        val INSTITUTION_NAME: String = "Institution 1"
    }

    @Test
    fun createInstitutionTest() {
        institutionService.createInstitution(INSTITUTION_NAME)

        val institution = institutionRepository.findOne(QInstitution.institution.name.eq(INSTITUTION_NAME))
        Assert.assertNotNull(institution)
        Assert.assertEquals(institution.name, INSTITUTION_NAME)
    }



}