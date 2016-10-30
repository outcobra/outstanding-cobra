package outcobra.server.service.internal

import org.springframework.stereotype.Component
import outcobra.server.model.Institution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.mapper.InstitutionDtoMapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.service.InstitutionService
import javax.inject.Inject

/**
 * Created by Florian on 29.10.2016.
 */
@Component
open class DefaultInstitutionService @Inject constructor(val mapper: InstitutionDtoMapper, val userService: DefaultUserService, val repository: InstitutionRepository) : InstitutionService {
    override fun createInstitution(name: String): InstitutionDto {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun updateInstitution(id: Long, name: String): InstitutionDto {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getInstitutionById(id: Long): InstitutionDto {
        var institution: Institution = repository.getOne(id)
        if (userService.getCurrentUser().userId == institution.user.auth0Id) {
            return mapper.toDto(institution)
        }
        return null!!
    }

    override fun deleteInstitution(id: Long) {

    }

}