package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.exception.ValidationKey
import outcobra.server.model.domain.QSemester
import outcobra.server.model.domain.SchoolYear
import outcobra.server.model.domain.Semester
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SemesterRepository
import outcobra.server.service.SemesterService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import outcobra.server.validator.SemesterValidator
import java.time.LocalDate
import javax.inject.Inject

@Component
@Transactional
class DefaultSemesterService
@Inject constructor(mapper: Mapper<Semester, SemesterDto>,
                    repository: SemesterRepository,
                    requestValidator: RequestValidator<SemesterDto>,
                    val userService: UserService,
                    val validator: SemesterValidator)
    : SemesterService, DefaultBaseService<Semester, SemesterDto, SemesterRepository>(mapper, repository, requestValidator, Semester::class) {

    override fun save(dto: SemesterDto): SemesterDto {
        val semester = mapper.fromDto(dto)
        if (!validator.validateSemesterCreation(semester)) {
            ValidationKey.SEMESTER_OVERLAP.throwException()
        }
        return super.save(dto)
    }

    override fun readAllBySchoolYear(schoolYearId: Long): List<SemesterDto> {
        requestValidator.validateRequestById(schoolYearId, SchoolYear::class)
        val filter = QSemester.semester.schoolYear.id.eq(schoolYearId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun getCurrentSemester(): List<SemesterDto> {
        val currentUserId = userService.getCurrentUser().id
        val today = LocalDate.now()
        //check ownership manually
        val withCurrentUser = QSemester.semester.schoolYear.user.id.eq(currentUserId)
        val todayBetweenValidFromAndTo = withCurrentUser.and(QSemester.semester.validFrom.loe(today)
                .and(QSemester.semester.validTo.goe(today)))
        return repository.findAll(todayBetweenValidFromAndTo).map { mapper.toDto(it) }
    }

    override fun readAllByUser(): List<SemesterDto> {
        val currentUserId = userService.getCurrentUser().id
        val withCurrentUser = QSemester.semester.schoolYear.user.id.eq(currentUserId)
        return repository.findAll(withCurrentUser).map { mapper.toDto(it) }
    }
}