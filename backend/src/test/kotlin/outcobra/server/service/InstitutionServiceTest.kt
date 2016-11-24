package outcobra.server.service

import com.google.common.truth.Truth.assertThat
import org.junit.After
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.ProfileRegistry
import outcobra.server.model.QInstitution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.repository.InstitutionRepository
import javax.inject.Inject

/**
 * Test class for the InstitutionService implementation
 */
@RunWith(SpringRunner::class)
@SpringBootTest
@ActiveProfiles(ProfileRegistry.PROFILE_MOCK_SERVICES)
@Transactional
open class InstitutionServiceTest {

    @Inject
    lateinit var institutionService: InstitutionService
    @Inject
    lateinit var institutionRepository: InstitutionRepository
    @Inject
    lateinit var userServiceMock: UserService

    /**
     * class constants and default values
     */
    companion object {
        val INSTITUTION_NAME: String = "Institution 1"
    }

    /**
     * deletes all existing institutions to make sure to have a clean environment
     */
    @After
    fun cleanUp() {
        institutionRepository.deleteAll()
    }

    /**
     * tests if we can find an institution by name in the database after inserting it
     */
    @Test
    fun createInstitutionTest() {
        institutionService.createInstitution(InstitutionDto(institutionName = INSTITUTION_NAME))

        val institution = institutionRepository.findOne(QInstitution.institution.name.eq(INSTITUTION_NAME))
        assertThat(institution).isNotNull()
        assertThat(institution.name).isEqualTo(INSTITUTION_NAME)
        assertThat(institution.user).isEqualTo(userServiceMock.getCurrentUser())
    }

    @Test
    fun updateInstitutionTest() {
        val savedDto = institutionService.createInstitution(InstitutionDto(institutionName = INSTITUTION_NAME))
        val institutionId = savedDto.institutionId
        val updatedName = "testUpdateInstitution"
        val updateDto = InstitutionDto(institutionId, 0, updatedName)
        institutionService.updateInstitution(updateDto)
        val institution = institutionRepository.findOne(QInstitution.institution.id.eq(institutionId))
        assertThat(institution).isNotNull()
        assertThat(institution.name).isEqualTo(updatedName)
    }

    /**
     * creates 2 institutions for the current user and one for another user
     * expects to get the 2 first institutions when reading all institutions
     */
    @Test
    fun readAllInstitutionsTest() {
        val institution1 = institutionService.createInstitution(InstitutionDto(institutionName = INSTITUTION_NAME))
        val institution2 = institutionService.createInstitution(InstitutionDto(institutionName = "laslsafl"))
        val dto = InstitutionDto(institutionName = "notInList", userId = 2L)
        institutionService.createInstitution(dto) //creates institution that should no be in the list

        val expected = arrayListOf(institution1, institution2)
        val institutions = institutionService.readAllInstitutions()

        assertThat(expected).isEqualTo(institutions)

    }

    /**
     * creates an institution and reads it by id
     * checks if these two are the same
     */
    @Test
    fun readInstitutionTest() {
        val institutionDto = institutionService.createInstitution(InstitutionDto(institutionName = INSTITUTION_NAME))
        val institutionId = institutionDto.institutionId
        assertThat(institutionDto).isEqualTo(institutionService.readInstitutionById(institutionId))
    }

    /**
     * creates a new institution and deletes this institution by id
     * expects to get null when searching for the institution
     */
    @Test
    fun deleteInstitutionTest() {
        val institutionDto = institutionService.createInstitution(InstitutionDto(institutionName = INSTITUTION_NAME))
        val institutionId = institutionDto.institutionId
        institutionService.deleteInstitution(institutionId)
        assertThat(institutionRepository.findOne(QInstitution.institution.id.eq(institutionId))).isNull()
    }

}