package outcobra.server.service

import outcobra.server.model.dto.InstitutionDto

/**
 * Created by Florian on 29.10.2016.
 */
interface InstitutionService {
    fun getInstitutionById(id: Long) :InstitutionDto
    fun deleteInstitution(id: Long)
    fun createInstitution(name: String) : InstitutionDto
    fun updateInstitution(id: Long, name: String) :InstitutionDto
}