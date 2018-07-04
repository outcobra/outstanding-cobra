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
import outcobra.server.model.domain.*
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.mapper.SchoolClassMapper
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.model.repository.SchoolClassSemesterRepository
import outcobra.server.model.repository.SemesterRepository
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
    lateinit var userService: UserService
    @Inject
    lateinit var schoolClassService: SchoolClassService
    @Inject
    lateinit var schoolClassRepository: SchoolClassRepository
    @Inject
    lateinit var schoolClassMapper: SchoolClassMapper
    @Inject
    lateinit var semesterRepository: SemesterRepository
    @Inject
    lateinit var schoolClassSemesterRepository: SchoolClassSemesterRepository

    lateinit var schoolClassByUser2: SchoolClass
    lateinit var schoolClassByCurrent: SchoolClass


    @Before
    fun setup() {
        val user2 = userRepository.findOne(QUser.user.mail.eq(Mocker.USER2_MAIL))
        schoolClassByUser2 = schoolClassRepository.save(SchoolClass("SchoolClassByUser2", user2))
        val semester = semesterRepository.save(Semester("Semester1"))

        val scs = schoolClassSemesterRepository.saveAndFlush(SchoolClassSemester(schoolClassByUser2, semester))
        schoolClassByUser2.schoolClassSemester.add(scs)

        schoolClassByCurrent = schoolClassRepository.findAll(
                QSchoolClass.schoolClass.user.mail.ne(userService.getCurrentUser().mail)
        ).first()
    }

    @Test
    fun testFakeChild() {
        assertThatThrownBy {
            val original = schoolClassMapper.toDto(schoolClassByUser2)
            val cuckooChild = schoolClassByCurrent.schoolClassSemester.first().semester
            val fake = original.copy(semesterSubjects = listOf(SchoolClassDto.SemesterSubjectDto(cuckooChild.id, listOf())))
            schoolClassService.save(fake)
        }.isInstanceOf(ValidationException::class.java)
    }

    @Test
    fun testFakeParent() {
        assertThatThrownBy {
            val original = schoolClassMapper.toDto(schoolClassByUser2)
            val fake = original.copy(userId = userService.getCurrentUser().id)
            schoolClassService.save(fake)
        }.isInstanceOf(ValidationException::class.java)
    }

    @Test
    fun testIllegalGet() {
        assertThatThrownBy {
            schoolClassService.readById(schoolClassByUser2.id)
        }.isInstanceOf(ValidationException::class.java)
    }

    @Test
    fun testIllegalDelete() {
        assertThatThrownBy {
            schoolClassService.delete(schoolClassByUser2.id)
        }.isInstanceOf(ValidationException::class.java)
    }
}