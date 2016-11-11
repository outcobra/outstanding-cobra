package outcobra.server.service

import outcobra.server.model.dto.InstitutionDto

interface InstitutionService {
    fun readAllInstitutions(): List<InstitutionDto>
    fun readInstitutionById(id: Long): InstitutionDto
    fun deleteInstitution(id: Long)
    fun createInstitution(name: String): InstitutionDto
    fun updateInstitution(institutionDto: InstitutionDto): InstitutionDto
}