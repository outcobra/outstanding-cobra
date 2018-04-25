package outcobra.server.service

import outcobra.server.model.domain.Institution
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.service.base.BaseService


/**
 * Service which handles all the business logic for the [Institution] entity
 *
 * @author Florian Bürgi
 * @since 1.0.0
 */
interface InstitutionService : BaseService<InstitutionDto> {
    /**
     * Reads all [Institution]s that are associated with the current user
     * @return A list with this users [Institution]s
     */
    fun readAll(): List<InstitutionDto>
}
