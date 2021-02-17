package outcobra.server.validator


import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatThrownBy
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.transaction.annotation.Transactional
import outcobra.server.config.ProfileRegistry.Companion.TEST
import outcobra.server.exception.ValidationKey
import outcobra.server.model.SchoolClass
import outcobra.server.model.SchoolYear
import outcobra.server.model.Semester
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.model.repository.SemesterRepository
import java.time.LocalDate
import javax.inject.Inject

@ExtendWith(SpringExtension::class)
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

    val now: LocalDate = LocalDate.now()
    var schoolClass: SchoolClass? = null
    var schoolYear: SchoolYear? = null
    var existing: Semester? = null

    @BeforeEach
    fun setUp() {
        if (schoolClass == null) {
            schoolClass = schoolClassRepository.findAll().first()
            schoolYear = schoolYearRepository.save(SchoolYear("", now, now.plusYears(1), schoolClass, listOf(), listOf()))
            existing = semesterRepository.save(Semester("", now, now.plusMonths(6), schoolYear, listOf(), listOf(), null))
        }
    }

    @Test
    fun validateValidSemesterCreation() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validTo.plusDays(1)
        val to = schoolYear!!.validTo
        val validation = validator.validateSemesterCreation(Semester("", from, to, schoolYear, listOf(), listOf(), null))
        assertThat(validation)
    }

    @Test
    fun validateCreationStartOverlap() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validTo.minusDays(20)
        val to = schoolYear!!.validTo
        val validation = validator.validateSemesterCreation(Semester("", from, to, schoolYear, listOf(), listOf(), null))
        assertThat(validation).isFalse()
    }

    @Test
    fun validateCreationInsideExisting() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validFrom.plusDays(10)
        val to = existing!!.validTo.minusDays(10)
        val validation = validator.validateSemesterCreation(Semester("", from, to, schoolYear, listOf(), listOf(), null))
        assertThat(validation).isFalse()
    }

    @Test
    fun validateCreationBiggerThanExisting() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validFrom.minusDays(10)
        val to = existing!!.validTo.plusDays(10)
        assertThatThrownBy {
            validator.validateSemesterCreation(Semester("", from, to, schoolYear, listOf(), listOf(), null))
        }.isEqualTo(ValidationKey.OUTSIDE_PARENT.makeException())
    }

    @Test
    fun validateCreationOutsideParent() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validTo.plusDays(1)
        val to = schoolYear!!.validTo.plusDays(10)
        assertThatThrownBy {
            validator.validateSemesterCreation(Semester("", from, to, schoolYear, listOf(), listOf(), null))
        }.isEqualTo(ValidationKey.OUTSIDE_PARENT.makeException())
    }

    @Test
    fun validateCreationEndStart() {
        assertThat(schoolClass).isNotNull()
        val from = existing!!.validTo.plusDays(1)
        val to = schoolYear!!.validTo
        assertThatThrownBy {
            validator.validateSemesterCreation(Semester("", to, from, schoolYear, listOf(), listOf(), null))
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
