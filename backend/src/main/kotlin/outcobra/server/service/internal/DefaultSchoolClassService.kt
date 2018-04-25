package outcobra.server.service.internal

import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.domain.Institution
import outcobra.server.model.domain.QSchoolClass
import outcobra.server.model.domain.SchoolClass
import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.SchoolClassRepository
import outcobra.server.service.SchoolClassService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.0.0
 */
@Component
@Transactional
class DefaultSchoolClassService
@Inject constructor(mapper: Mapper<SchoolClass, SchoolClassDto>,
                    repository: SchoolClassRepository,
                    requestValidator: RequestValidator<SchoolClassDto>,
                    val userService: UserService)
    : SchoolClassService, DefaultBaseService<SchoolClass, SchoolClassDto, SchoolClassRepository>(mapper, repository, requestValidator, SchoolClass::class) {

    override fun readAllByUser(): List<SchoolClassDto> {
        val userId = userService.getCurrentUser().id
        val filter = QSchoolClass.schoolClass.institution.user.id.eq(userId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun readAllByInstitution(institutionId: Long): List<SchoolClassDto> {
        requestValidator.validateRequestById(institutionId, Institution::class)
        val filter = QSchoolClass.schoolClass.institution.id.eq(institutionId)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }
}