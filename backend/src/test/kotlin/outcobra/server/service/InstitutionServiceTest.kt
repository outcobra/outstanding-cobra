package outcobra.server.service

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.transaction.annotation.Transactional
import outcobra.server.config.ProfileRegistry.Companion.TEST
import outcobra.server.model.Institution
import outcobra.server.model.QInstitution
import outcobra.server.model.QUser
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.UserRepository
import javax.inject.Inject

/**
 * Test class for the InstitutionService implementation
 * @author Joel Messerli
 * @since 1.0.0
 */
@ExtendWith(SpringExtension::class)
@SpringBootTest
@ActiveProfiles(TEST)
@Transactional
class InstitutionServiceTest {

    @Inject
    lateinit var institutionService: InstitutionService
    @Inject
    lateinit var institutionRepository: InstitutionRepository
    @Inject
    lateinit var userService: UserService
    @Inject
    lateinit var userRepository: UserRepository

    var userId: Long = 0

    /**
     * class constants and default values
     */
    companion object {
        val INSTITUTION_NAME: String = "Institution 1"
    }

    @BeforeEach
    fun setup() {
        userId = userService.getCurrentUser().id
    }

    /**
     * tests if we can find an institution by name in the database after inserting it
     */
    @Test
    fun createInstitutionTest() {
        institutionService.save(InstitutionDto(name = INSTITUTION_NAME, userId = userId))
        val institution = institutionRepository.findOne(QInstitution.institution.name.eq(INSTITUTION_NAME)).get()
        assertThat(institution).isNotNull()
        assertThat(institution.name).isEqualTo(INSTITUTION_NAME)
        assertThat(institution.user).isEqualTo(userService.getCurrentUser())
    }

    @Test
    fun updateInstitutionTest() {
        val savedDto = institutionService.save(InstitutionDto(name = INSTITUTION_NAME, userId = userId))
        val institutionId = savedDto.id
        val updatedName = "testUpdateInstitution"
        val updateDto = InstitutionDto(institutionId, userId, updatedName)
        institutionService.save(updateDto)
        val institution = institutionRepository.findOne(QInstitution.institution.id.eq(institutionId)).get()
        assertThat(institution).isNotNull()
        assertThat(institution.name).isEqualTo(updatedName)
    }

    /**
     * creates 2 institutions for the current user and one for another user
     * expects to get the 2 first institutions when reading all institutions
     */
    @Test
    fun readAllInstitutionsTest() {
        val institution1 = institutionService.save(InstitutionDto(name = INSTITUTION_NAME, userId = userId))
        val institution2 = institutionService.save(InstitutionDto(name = "laslsafl", userId = userId))
        val secondUser = userRepository.findAll(QUser.user.id.ne(institution1.userId)).first()
        val notInList = Institution("notInList", secondUser)
        institutionRepository.save(notInList) //creates institution that should not be in the list

        val expected = arrayListOf(institution1, institution2)
        val institutions = institutionService.readAll()

        assertThat(expected).isEqualTo(institutions)
    }

    /**
     * creates an institution and reads it by id
     * checks if these two are the same
     */
    @Test
    fun readInstitutionTest() {
        val institutionDto = institutionService.save(InstitutionDto(name = INSTITUTION_NAME, userId = userId))
        val institutionId = institutionDto.id
        assertThat(institutionDto).isEqualTo(institutionService.readById(institutionId))
    }

    /**
     * creates a new institution and deletes this institution by id
     * expects to get null when searching for the institution
     */
    @Test
    fun deleteInstitutionTest() {
        val institutionDto = institutionService.save(InstitutionDto(name = INSTITUTION_NAME, userId = userId))
        val institutionId = institutionDto.id
        institutionService.delete(institutionId)
        assertThat(institutionRepository.existsById(institutionId)).isFalse
    }

}
