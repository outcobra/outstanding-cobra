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
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.repository.InstitutionRepository
import java.util.*

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
        institutionService.createInstitution(InstitutionDto(institutionName = INSTITUTION_NAME))

        val institution = institutionRepository.findOne(QInstitution.institution.name.eq(INSTITUTION_NAME))
        Assert.assertNotNull(institution)
        Assert.assertEquals(institution.name, INSTITUTION_NAME)
    }

    @Test
    fun updateInstitutionTest() {
        var institutionDto = institutionService.createInstitution(InstitutionDto(institutionName = INSTITUTION_NAME))
        val institutionId = institutionDto.institutionId
        var updatedName = "testUpdateInstitution"
        var updateDto = InstitutionDto(institutionId,0,updatedName)
        institutionService.updateInstitution(updateDto)
        val institution = institutionRepository.findOne(QInstitution.institution.id.eq(institutionId))
        Assert.assertNotNull(institution)
        Assert.assertEquals(institution.name, updatedName)
    }

    @Test
    fun readAllInstitutionsTest() {
        var institution1 = institutionService.createInstitution(InstitutionDto(institutionName = INSTITUTION_NAME))
        var institution2 = institutionService.createInstitution(InstitutionDto(institutionName = "laslsafl"))

        val expected = ArrayList<InstitutionDto>(Arrays.asList(institution1,institution2))
        val institutions = institutionService.readAllInstitutions()

        Assert.assertEquals(expected,institutions)

    }

    @Test
    fun readInstitutionTest() {
        var institutionDto = institutionService.createInstitution(InstitutionDto(institutionName = INSTITUTION_NAME))
        val institutionId = institutionDto.institutionId
        Assert.assertEquals(institutionDto,institutionService.readInstitutionById(institutionId))
    }

    @Test
    fun deleteInstitutionTest() {
        var institutionDto = institutionService.createInstitution(InstitutionDto(institutionName = INSTITUTION_NAME))
        val institutionId = institutionDto.institutionId
        institutionService.deleteInstitution(institutionId)
        Assert.assertNull(institutionRepository.findOne(QInstitution.institution.id.eq(institutionId)))
    }
}