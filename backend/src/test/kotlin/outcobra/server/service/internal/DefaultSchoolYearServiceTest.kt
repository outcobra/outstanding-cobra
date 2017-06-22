package outcobra.server.service.internal

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
import outcobra.server.exception.ValidationException
import outcobra.server.exception.ValidationKey
import outcobra.server.model.Institution
import outcobra.server.model.SchoolClass
import outcobra.server.model.SchoolYear
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.service.UserService
import java.time.LocalDate
import javax.inject.Inject

@RunWith(SpringRunner::class)
@SpringBootTest
@ActiveProfiles(TEST)
@Transactional
class DefaultSchoolYearServiceTest {

    @Inject
    lateinit var userService: UserService
    @Inject
    lateinit var institutionRepository: InstitutionRepository
    @Inject
    lateinit var schoolClassRepository: SchoolClassRepository
    @Inject
    lateinit var schoolYearService: DefaultSchoolYearService
    @Inject
    lateinit var schoolYearMapper: Mapper<SchoolYear, SchoolYearDto>
    @Inject
    lateinit var schoolYearRepository: SchoolYearRepository

    val now = LocalDate.now()
    var institution: Institution? = null
    var schoolClass: SchoolClass? = null
    var existing: SchoolYear? = null
    var yearCount = -1L

    @Before
    fun setUp() {
        institution = institutionRepository.save(Institution("Test", userService.getCurrentUser()))
        schoolClass = schoolClassRepository.save(SchoolClass("TestClass", institution, listOf()))
        existing = schoolYearRepository.save(SchoolYear("existing", now, now.plusYears(1), schoolClass, listOf(), listOf()))
        yearCount = schoolYearRepository.count()
    }

    @Test
    fun saveValidNew() {
        saveValidYear()
        assertThat(schoolYearRepository.count()).isEqualTo(yearCount + 1)
    }

    @Test
    fun saveValidUpdate() {
        existing?.validTo?.plusYears(1)
        schoolYearService.save(schoolYearMapper.toDto(existing))
        assertThat(schoolYearRepository.count()).isEqualTo(yearCount)
    }

    @Test
    fun saveInvalidStartEnd() {
        val from = existing?.validTo?.plusDays(1)
        val to = now.plusYears(2)
        val invalidYear = SchoolYear("invalid", to, from, schoolClass, listOf(), listOf())
        assertThatThrownBy {
            schoolYearService.save(schoolYearMapper.toDto(invalidYear))
        }.isEqualTo(ValidationKey.START_BIGGER_THAN_END.makeException())
        assertThat(schoolYearRepository.count()).isEqualTo(yearCount)
    }

    @Test
    fun saveInvalidOverlap() {
        val from = existing?.validTo
        val to = now.plusYears(2)
        val invalidYear = SchoolYear("invalid", from, to, schoolClass, listOf(), listOf())
        assertThatThrownBy {
            schoolYearService.save(schoolYearMapper.toDto(invalidYear))
        }.isInstanceOf(ValidationException::class.java)
        assertThat(schoolYearRepository.count()).isEqualTo(yearCount)
    }

    @Test
    fun readAllBySchoolClass() {
        assertThat(schoolClass).isNotNull()
        var count = schoolYearService.readAllBySchoolClass(schoolClassId = schoolClass!!.id).count()
        assertThat(count).isEqualTo(1)
        saveValidYear()
        count = schoolYearService.readAllBySchoolClass(schoolClassId = schoolClass!!.id).count()
        assertThat(count).isEqualTo(2)
    }

    @Test
    fun readById() {
        assertThat(existing != null)
        val dto = schoolYearService.readById(existing!!.id)
        assertThat(dto.id).isEqualTo(existing!!.id)
        assertThat(dto.name).isEqualTo(existing!!.name)
        assertThat(dto.validFrom).isEqualTo(existing!!.validFrom)
        assertThat(dto.validTo).isEqualTo(existing!!.validTo)
        assertThat(dto.schoolClassId).isEqualTo(schoolClass?.id)
    }

    private fun saveValidYear() {
        val from = existing?.validTo?.plusDays(1)
        val to = now.plusYears(2)
        val validYear = SchoolYear("valid", from, to, schoolClass, listOf(), listOf())
        schoolYearService.save(schoolYearMapper.toDto(validYear))
    }

}
