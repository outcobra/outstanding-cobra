package outcobra.server.service.internal

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import outcobra.server.model.Institution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.model.repository.InstitutionRepository
import outcobra.server.service.InstitutionService
import javax.inject.Inject

/**
 * Created by Florian on 29.10.2016.
 */
@Component
open class DefaultInstitutionService  @Inject constructor(val repository: InstitutionRepository) : InstitutionService {

    override fun getInstitutionById(id: Long) : InstitutionDto {
        var institution : Institution = repository.getOne(id)
        return InstitutionDto(institution.id,institution.name)

    }

    override fun deleteInstitution(id: Long) {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun createInstitution(name: String) {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun updateInstitution(id: Long name: String) {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}