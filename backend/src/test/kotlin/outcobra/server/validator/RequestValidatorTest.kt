package outcobra.server.validator

import org.assertj.core.api.Assertions.assertThatThrownBy
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import outcobra.server.Mocker
import outcobra.server.config.ProfileRegistry.Companion.TEST
import outcobra.server.exception.ValidationException
import outcobra.server.model.Institution
import outcobra.server.model.QInstitution
import outcobra.server.model.QUser
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.InstitutionService
import outcobra.server.service.SchoolClassService
import outcobra.server.service.UserService
import javax.inject.Inject
import javax.transaction.Transactional

/**
 * This test class checks if the request validation is working properly.
 * In this case the [InstitutionService] is under test.
 * Since the implementation in all of our services is almost the same,
 * these tests are representative for all of them.
 *
 * @author Florian Bürgi
 * @since 1.1.0
 */
@SpringBootTest
@RunWith(SpringRunner::class)
@ActiveProfiles(TEST)
@Transactional
class RequestValidatorTest {

    @Inject
    lateinit var userRepository: UserRepository
    @Inject
    lateinit var userServiceMock: UserService
    @Inject
    lateinit var institutionRepository: InstitutionRepository
    @Inject
    lateinit var institutionService: InstitutionService
    @Inject
    lateinit var institutionMapper: Mapper<Institution, InstitutionDto>
    @Inject
    lateinit var schoolClassService: SchoolClassService


    lateinit var institutionByUser2: Institution
    lateinit var institutionByCurrent: Institution

    @Before
    fun setup() {
        val user2 = userRepository.findOne(QUser.user.auth0Id.eq(Mocker.USER2_AUTH0_ID))
        institutionByUser2 = institutionRepository.save(Institution("InstitutionByUser2", user2))
        institutionByCurrent = institutionRepository.findAll(
                QInstitution.institution.user.auth0Id.ne(userServiceMock.getTokenUserId())).first()

    }

    @Test
    fun testFakeChild() {
        assertThatThrownBy {
            val original = institutionMapper.toDto(institutionByUser2)
            val cuckooChild = institutionByCurrent.schoolClasses!!.first()
            val fake = InstitutionDto(original.id, original.userId, original.name, arrayListOf(cuckooChild.id))
            institutionService.save(fake)
        }.isInstanceOf(ValidationException::class.java)
    }

    @Test
    fun testFakeParent() {
        assertThatThrownBy {
            val original = institutionMapper.toDto(institutionByUser2)
            val fake = InstitutionDto(original.id, userServiceMock.getCurrentUser().id, original.name, original.schoolClassIds)
            institutionService.save(fake)
        }.isInstanceOf(ValidationException::class.java)
    }

    @Test
    fun testIllegalGet() {
        assertThatThrownBy {
            institutionService.readById(institutionByUser2.id)
        }.isInstanceOf(ValidationException::class.java)
    }

    @Test
    fun testIllegalDelete() {
        assertThatThrownBy {
            institutionService.delete(institutionByUser2.id)
        }.isInstanceOf(ValidationException::class.java)
    }

    @Test
    fun testIllegalReadByParent() {
        assertThatThrownBy {
            schoolClassService.readAllByInstitution(institutionByUser2.id)
        }.isInstanceOf(ValidationException::class.java)
    }
}