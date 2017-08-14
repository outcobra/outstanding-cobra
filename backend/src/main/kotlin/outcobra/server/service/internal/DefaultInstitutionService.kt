package outcobra.server.service.internal

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.Institution
import outcobra.server.model.QInstitution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.service.InstitutionService
import outcobra.server.service.base.internal.DefaultBaseService
import outcobra.server.validator.RequestValidator
import javax.inject.Inject

@Service
@Transactional
class DefaultInstitutionService
@Inject constructor(mapper: Mapper<Institution, InstitutionDto>,
                    repository: InstitutionRepository,
                    requestValidator: RequestValidator<InstitutionDto>) : InstitutionService,
        DefaultBaseService<Institution, InstitutionDto, InstitutionRepository>(mapper,
                repository,
                requestValidator,
                Institution::class) {


    override fun readAll(): List<InstitutionDto> {
        val whereOwnerMatch = QInstitution.institution.user.auth0Id.eq(requestValidator.userService.getTokenUserId())
        return repository.findAll(whereOwnerMatch).map { mapper.toDto(it) }
    }

}