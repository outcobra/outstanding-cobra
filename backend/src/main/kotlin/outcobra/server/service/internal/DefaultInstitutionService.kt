package outcobra.server.service.internal

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import outcobra.server.model.Institution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.mapper.Mapper
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.service.InstitutionService
import javax.inject.Inject

@Service
@Transactional
open class DefaultInstitutionService
@Inject constructor(val mapper: Mapper<Institution, InstitutionDto>,
                    val userService: DefaultUserService,
                    val repository: InstitutionRepository) : InstitutionService {

    override fun createInstitution(name: String): InstitutionDto {
        val institution: Institution = Institution(name, userService.getCurrentUser())
        repository.save(institution)
        return mapper.toDto(institution)
    }

    override fun updateInstitution(institutionDto: InstitutionDto): InstitutionDto {
        var institution = repository.save(mapper.fromDto(institutionDto))
        return mapper.toDto(institution)
    }

    override fun readInstitutionById(id: Long): InstitutionDto {
        val institution: Institution = repository.getOne(id)
        return mapper.toDto(institution)
    }

    override fun deleteInstitution(id: Long) {
        repository.delete(id)
    }

    fun deleteInstitution(institutionDto: InstitutionDto) {
        deleteInstitution(institutionDto.institutionId)
    }

}