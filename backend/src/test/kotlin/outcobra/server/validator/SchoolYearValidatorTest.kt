package outcobra.server.validator

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
import outcobra.server.model.SchoolClass
import outcobra.server.model.SchoolYear
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.service.UserService
import java.time.LocalDate
import javax.inject.Inject


@ExtendWith(SpringExtension::class)
@SpringBootTest
@ActiveProfiles(TEST)
@Transactional
class SchoolYearValidatorTest {

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

    val now: LocalDate = LocalDate.now()

    @BeforeEach
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
