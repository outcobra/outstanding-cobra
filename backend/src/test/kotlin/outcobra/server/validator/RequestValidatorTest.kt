package outcobra.server.validator

import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import outcobra.server.config.ProfileRegistry.Companion.TEST
import outcobra.server.model.repository.UserRepository
import outcobra.server.service.SchoolClassService
import outcobra.server.service.UserService
import javax.inject.Inject
import javax.transaction.Transactional

/**
 * This test class checks if the request validation is working properly. TODO correct
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
    lateinit var schoolClassService: SchoolClassService


    /*@Before TODO rewrite test with other entity
    fun setup() {
        val user2 = userRepository.findOne(QUser.user.mail.eq(Mocker.USER2_MAIL))
        institutionByUser2 = institutionRepository.save(Institution("InstitutionByUser2", user2))
        institutionByCurrent = institutionRepository.findAll(
                QInstitution.institution.user.mail.ne(userServiceMock.getCurrentUser().mail)).first()

    }

    @Test
    fun testFakeChild() {
        assertThatThrownBy {
            val original = institutionMapper.toDto(institutionByUser2)
            val cuckooChild = institutionByCurrent.schoolClasses.first()
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
    }*/
}