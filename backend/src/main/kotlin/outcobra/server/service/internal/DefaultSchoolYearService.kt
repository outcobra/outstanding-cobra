package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.exception.ValidationKey
import outcobra.server.model.domain.QSchoolYear
import outcobra.server.model.domain.SchoolClass
import outcobra.server.model.domain.SchoolYear
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.model.mapper.SchoolYearMapper
import outcobra.server.model.repository.SchoolYearRepository
import outcobra.server.service.SchoolYearService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import outcobra.server.validator.SchoolYearValidator
import javax.inject.Inject

@Component
@Transactional
class DefaultSchoolYearService
@Inject constructor(val schoolYearMapper: SchoolYearMapper,
                    repository: SchoolYearRepository,
                    requestValidator: RequestValidator<SchoolYearDto>,
                    val userService: UserService,
                    val schoolYearValidator: SchoolYearValidator)
    : SchoolYearService, DefaultBaseService<SchoolYear, SchoolYearDto, SchoolYearRepository>(schoolYearMapper, repository, requestValidator, SchoolYear::class) {

    override fun save(dto: SchoolYearDto): SchoolYearDto {
        val schoolYear = schoolYearMapper.fromDto(dto)
        if (!schoolYearValidator.validateSchoolYearCreation(schoolYear)) {
            ValidationKey.SCHOOL_YEAR_OVERLAP.throwException()
        }
        return super.save(dto)
    }

    override fun readAllBySchoolClass(schoolClassId: Long): List<SchoolYearDto> {
        requestValidator.validateRequestById(schoolClassId, SchoolClass::class)
        val filter = QSchoolYear.schoolYear.schoolClasses.any().id.eq(schoolClassId)
        return repository.findAll(filter).map { schoolYearMapper.toDto(it) }
    }

    override fun readAllByUser(): List<SchoolYearDto> {
        return repository.findByUserId(userService.getCurrentUser().id)
                .map { schoolYearMapper.toDto(it) }
    }
}