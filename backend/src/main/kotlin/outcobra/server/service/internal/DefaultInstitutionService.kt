package outcobra.server.service.internal

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.Institution
import outcobra.server.model.QInstitution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.interfaces.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.service.InstitutionService
import outcobra.server.service.UserService
import outcobra.server.service.base.internal.DefaultBaseService
import javax.inject.Inject

@Service
@Transactional
open class DefaultInstitutionService
@Inject constructor(val mapper: Mapper<Institution, InstitutionDto>,
                    val repository: InstitutionRepository,
                    val userService: UserService)
    : InstitutionService, DefaultBaseService<Institution, InstitutionDto>(mapper, repository) {


    override fun readAllInstitutions(): List<InstitutionDto> {
        val whereOwnerMatch = QInstitution.institution.user.auth0Id.eq(userService.getTokenUserId())
        return repository.findAll(whereOwnerMatch).map { dtoMapper.toDto(it) }
    }

}