package outcobra.server.model.mapper

import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatThrownBy
import org.junit.Before
import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.transaction.annotation.Transactional
import outcobra.server.config.ProfileRegistry.Companion.TEST
import outcobra.server.exception.ValidationKey
import outcobra.server.model.*
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.service.UserService
import java.time.LocalDate
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.4.0
 */
@RunWith(SpringRunner::class)
@SpringBootTest
@Transactional
@ActiveProfiles(TEST)
class SemesterMapperTest {

    @Inject
    lateinit var semesterMapper: Mapper<Semester, SemesterDto>

    @Inject
    lateinit var institutionRepository: InstitutionRepository

    @Inject
    lateinit var schoolClassRepository: SchoolClassRepository

    @Inject
    lateinit var schoolYearRepository: SchoolYearRepository

    @Inject
    lateinit var userService: UserService

    private val now = LocalDate.now()
    private val baseSemester = createBasicSemester()
    private var schoolYear: SchoolYear? = null

    private fun createBasicSemester(): Semester {
        val semesterName = "TestSemester"
        val validFrom = now.minusMonths(6)
        val validTo = now
        val parentYear = SchoolYear("TestYear", now.minusYears(1), now, SchoolClass(), listOf(), listOf())
        val subjects = arrayListOf(Subject("TestSemester", Color.randomColor))
        return Semester(semesterName, validFrom, validTo, parentYear, subjects)
    }

    @Before
    fun saveRequiredEntities() {
        var institution = Institution("TestInstitution", userService.getCurrentUser())
        institution = institutionRepository.save(institution)
        var schoolClass = SchoolClass("TestSchoolClass2017", institution)
        schoolClass = schoolClassRepository.save(schoolClass)
        schoolYear = SchoolYear("TestSchoolYear", now.minusYears(1), now, schoolClass, listOf(), listOf())
        schoolYear = schoolYearRepository.save(schoolYear)
    }

    @Test
    fun mapValidEntityToDto() {
        val semesterDto = semesterMapper.toDto(baseSemester)
        assertThat(semesterDto.name).isEqualTo(baseSemester.name)
        assertThat(semesterDto.subjectIds.count()).isEqualTo(1)
        assertThat(semesterDto.validFrom).isEqualTo(baseSemester.validFrom)
        assertThat(semesterDto.validTo).isEqualTo(baseSemester.validTo)
    }

    @Test
    fun mapValidDtoToEntity() {
        val name = "TestSemesterDto"
        val validFrom = now.minusYears(1)
        val validTo = now.minusDays(186)
        val semesterDto = SemesterDto(0L, schoolYear!!.id, name, validFrom, validTo)
        val semesterEntity = semesterMapper.fromDto(semesterDto)
        assertThat(semesterEntity.name).isEqualTo(name)
        assertThat(semesterEntity.schoolYear).isEqualTo(schoolYear)
        assertThat(semesterEntity.validFrom).isEqualTo(validFrom)
        assertThat(semesterEntity.validTo).isEqualTo(validTo)
    }

    @Ignore
    @Test
    fun tryMapInvalidDto() {
        val name = "TestSemesterDto"
        val validFrom = now.minusYears(1)
        val validTo = now.minusDays(186)
        val semesterDto = SemesterDto(0L, schoolYear!!.id.plus(10), name, validFrom, validTo)
        assertThatThrownBy {
            semesterMapper.fromDto(semesterDto)
        }.isEqualTo(ValidationKey.ENTITY_NOT_FOUND.makeException())
    }


}