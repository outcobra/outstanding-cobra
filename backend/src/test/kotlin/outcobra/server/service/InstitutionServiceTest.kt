package outcobra.server.service

import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import outcobra.server.Mocker
import outcobra.server.OutstandingCobraServerApplicationTests
import outcobra.server.model.Institution
import outcobra.server.model.QInstitution
import outcobra.server.model.User
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.UserRepository

@RunWith(SpringRunner::class)
@SpringBootTest
@ActiveProfiles("mock")
class InstitutionServiceTest {

    @Autowired
    lateinit var institutionService: InstitutionService
    @Autowired
    lateinit var institutionRepository: InstitutionRepository
    @Autowired
    lateinit var userRepository: UserRepository

    companion object {
        val INSTITUTION_NAME: String = "Institution 1"
    }

    @Before
    fun setup() {
        val user = userRepository.findOne(Mocker.USER.id)
        println(user)
    }

    @Test
    fun createInstitutionTest() {
        institutionService.createInstitution(INSTITUTION_NAME)

        val institution = institutionRepository.findOne(QInstitution.institution.name.eq(INSTITUTION_NAME))
        Assert.assertNotNull(institution)
        Assert.assertEquals(institution.name, INSTITUTION_NAME)
    }



}