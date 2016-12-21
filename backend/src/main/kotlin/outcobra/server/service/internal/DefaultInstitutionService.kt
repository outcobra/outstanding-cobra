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
import javax.inject.Inject

@Service
@Transactional
open class DefaultInstitutionService
@Inject constructor(val mapper: Mapper<Institution, InstitutionDto>,
                    val userService: UserService,
                    val repository: InstitutionRepository) : InstitutionService {

    override fun createInstitution(institutionDto: InstitutionDto): InstitutionDto {
        val new = mapper.fromDto(institutionDto)
        return mapper.toDto(repository.save(new))
    }

    override fun readAllInstitutions(): List<InstitutionDto> {
        val filter = QInstitution.institution.user.id.eq(userService.getCurrentUser()?.id)
        return repository.findAll(filter).map { mapper.toDto(it) }
    }

    override fun updateInstitution(institutionDto: InstitutionDto): InstitutionDto {
        val institution = repository.save(mapper.fromDto(institutionDto))
        return mapper.toDto(institution)
    }

    override fun readInstitutionById(id: Long): InstitutionDto {
        val institution: Institution = repository.getOne(id)
        return mapper.toDto(institution)
    }

    override fun deleteInstitution(id: Long) {
        repository.delete(id)
    }
}