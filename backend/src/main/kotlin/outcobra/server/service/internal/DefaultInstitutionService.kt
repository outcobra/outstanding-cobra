package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.Institution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.mapper.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.service.InstitutionService
import javax.inject.Inject

@Service
open class DefaultInstitutionService
@Inject constructor(val mapper: Mapper<Institution, InstitutionDto>,
                    val userService: DefaultUserService,
                    val repository: InstitutionRepository) : InstitutionService {

    override fun createInstitution(name: String): InstitutionDto {
        val institution: Institution = Institution(name, userService.getCurrentUser())
        repository.saveAndFlush(institution)
        return mapper.toDto(institution)
    }

    override fun updateInstitution(id: Long, name: String): InstitutionDto {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getInstitutionById(id: Long): InstitutionDto {
        val institution: Institution = repository.getOne(id)
        if (userService.getCurrentUserDto().userId == institution.user.auth0Id) {
            return mapper.toDto(institution)
        }
        return null!!
    }

    override fun deleteInstitution(id: Long) {

    }

}