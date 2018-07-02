package outcobra.server.validator


import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatThrownBy
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.config.ProfileRegistry.Companion.TEST
import outcobra.server.exception.ValidationKey
import outcobra.server.model.domain.SchoolClass
import outcobra.server.model.domain.SchoolYear
import outcobra.server.model.domain.Semester
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.service.UserService
import java.time.LocalDate
import javax.inject.Inject

@RunWith(SpringRunner::class)
@SpringBootTest
@ActiveProfiles(TEST)
@Transactional
class SemesterValidatorTest {
    @Inject
    lateinit var semesterRepository: SemesterRepository
    @Inject
    lateinit var schoolYearRepository: SchoolYearRepository
    @Inject
    lateinit var schoolClassRepository: SchoolClassRepository
    @Inject
    lateinit var validator: SemesterValidator
    @Inject
    lateinit var userService: UserService

    val now: LocalDate = LocalDate.now()
    var schoolClass: SchoolClass? = null
    var schoolYear: SchoolYear? = null
    var existing: Semester? = null

    @Before
    fun setUp() {
        if (schoolClass == null) {
            schoolClass = schoolClassRepository.findAll().first()
            schoolYear = schoolYearRepository.saveAndFlush(SchoolYear("", now, now.plusYears(1), userService.getCurrentUser(), mutableListOf(schoolClass!!), listOf(), listOf()))
            existing = semesterRepository.saveAndFlush(Semester("", now, now.plusMonths(6), schoolYear, listOf(), null))
        }
    }

    @Test
    fun validateValidSemesterCreation() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validTo.plusDays(1)
        val to = schoolYear!!.validTo
        val validation = validator.validateSemesterCreation(Semester("", from, to, schoolYear, listOf(), null))
        assertThat(validation)
    }

    @Test
    fun validateCreationStartOverlap() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validTo.minusDays(20)
        val to = schoolYear!!.validTo
        val validation = validator.validateSemesterCreation(Semester("", from, to, schoolYear, listOf(), null))
        assertThat(validation).isFalse()
    }

    @Test
    fun validateCreationInsideExisting() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validFrom.plusDays(10)
        val to = existing!!.validTo.minusDays(10)
        val validation = validator.validateSemesterCreation(Semester("", from, to, schoolYear, listOf(), null))
        assertThat(validation).isFalse()
    }

    @Test
    fun validateCreationBiggerThanExisting() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validFrom.minusDays(10)
        val to = existing!!.validTo.plusDays(10)
        assertThatThrownBy {
            validator.validateSemesterCreation(Semester("", from, to, schoolYear, listOf(), null))
        }.isEqualTo(ValidationKey.OUTSIDE_PARENT.makeException())
    }

    @Test
    fun validateCreationOutsideParent() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validTo.plusDays(1)
        val to = schoolYear!!.validTo.plusDays(10)
        assertThatThrownBy {
            validator.validateSemesterCreation(Semester("", from, to, schoolYear, listOf(), null))
        }.isEqualTo(ValidationKey.OUTSIDE_PARENT.makeException())
    }

    @Test
    fun validateCreationEndStart() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validTo.plusDays(1)
        val to = schoolYear!!.validTo
        assertThatThrownBy {
            validator.validateSemesterCreation(Semester("", to, from, schoolYear, listOf(), null))
        }.isEqualTo(ValidationKey.START_BIGGER_THAN_END.makeException())
    }

    @Test
    fun validateUpdateOutsideParent() {
        assertThat(schoolYear).isNotNull()
        existing!!.validFrom = existing!!.validFrom.minusDays(20)
        assertThatThrownBy {
            validator.validateSemesterCreation(existing!!)
        }.isEqualTo(ValidationKey.OUTSIDE_PARENT.makeException())
    }

    @Test
    fun validateUpdate() {
        assertThat(existing).isNotNull()
        existing!!.validFrom.plusDays(20)
        val validation = validator.validateSemesterCreation(existing!!)
        assertThat(validation)
    }
}