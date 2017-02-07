package outcobra.server.validator

import com.google.common.truth.Truth.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.config.ProfileRegistry.Companion.MOCK_SERVICES
import outcobra.server.model.Institution
import outcobra.server.model.SchoolClass
import outcobra.server.model.SchoolYear
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.service.UserService
import java.time.LocalDate
import javax.inject.Inject


@RunWith(SpringRunner::class)
@SpringBootTest
@ActiveProfiles(MOCK_SERVICES)
@Transactional
open class SchoolYearValidatorTest {

    @Inject
    lateinit var userService: UserService
    @Inject
    lateinit var institutionRepository: InstitutionRepository
    @Inject
    lateinit var classRepository: SchoolClassRepository
    @Inject
    lateinit var yearRepository: SchoolYearRepository
    @Inject
    lateinit var validator: SchoolYearValidator

    lateinit var existing: SchoolYear
    lateinit var schoolClass: SchoolClass

    val now = LocalDate.now()

    @Before
    fun before() {
        val institution = Institution("TEST", userService.getCurrentUser())
        schoolClass = SchoolClass("tester", institution, listOf())
        existing = SchoolYear("existing", now, now.plusYears(1), schoolClass, listOf(), listOf())

        institutionRepository.save(institution)
        classRepository.save(schoolClass)
        yearRepository.save(existing)
    }

    @Test
    fun testValidCreation() {
        val toCreate = SchoolYear("valid", now.minusYears(1), now.minusDays(1), schoolClass, listOf(), listOf())
        assertThat(validator.validateSchoolYearCreation(toCreate)).isTrue()
    }

    @Test
    fun testInvalidWithSameDates() {
        val toCreate = SchoolYear("invalid", now, now.plusYears(1), schoolClass, listOf(), listOf())
        assertThat(validator.validateSchoolYearCreation(toCreate)).isFalse()


    }
}