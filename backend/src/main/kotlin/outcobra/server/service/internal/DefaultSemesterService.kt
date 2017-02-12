package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.exception.DateOutsideExpectedRangeException
import outcobra.server.model.QSemester
import outcobra.server.model.SchoolYear
import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.service.SemesterService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.SemesterValidator
import java.time.LocalDate
import javax.inject.Inject

@Component
@Transactional
open class DefaultSemesterService
@Inject constructor(mapper: Mapper<Semester, SemesterDto>,
                    repository: SemesterRepository,
                    val userService: UserService,
                    val validator: SemesterValidator)
    : SemesterService, DefaultBaseService<Semester, SemesterDto, SemesterRepository>(mapper, repository) {

    override fun save(dto: SemesterDto): SemesterDto {
        val semester = mapper.fromDto(dto)
        if (!validator.validateSemesterCreation(semester)) {
            throw DateOutsideExpectedRangeException("The new semester overlaps with an existing one")
        }
        return super.save(dto)
    }

    override fun readAllBySchoolYear(schoolYearId: Long): List<SemesterDto> {
        validationService.validateByParentId(schoolYearId, SchoolYear::class)
        val filter = QSemester.semester.schoolYear.id.eq(schoolYearId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun getCurrentSemester(): List<SemesterDto> {
        val currentUserId = userService.getCurrentUser()?.id
        val today = LocalDate.now()
        //check ownership manually
        val withCurrentUser = QSemester.semester.schoolYear.schoolClass.institution.user.id.eq(currentUserId)
        val todayBetweenValidFromAndTo = withCurrentUser.and(QSemester.semester.validFrom.loe(today)
                .and(QSemester.semester.validTo.goe(today)))
        return repository.findAll(todayBetweenValidFromAndTo).map { mapper.toDto(it) }
    }
}