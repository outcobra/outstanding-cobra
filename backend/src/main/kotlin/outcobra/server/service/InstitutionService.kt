package outcobra.server.service

/**
 * Created by Florian on 29.10.2016.
 */
interface InstitutionService {
    fun getInstitutionById(id: Int)
    fun deleteInstitution(id: Int)
    fun createInstitution(name: String)
    fun updateInstitution(id: Int, name: String)
}