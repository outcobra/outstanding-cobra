package outcobra.server.service

import outcobra.server.model.dto.SchoolClassDto
import outcobra.server.service.base.BaseService

/**
 * This interface defines all functions for a SchoolClass service
 * @author Florian Bürgi
 * @since 1.0.0
 */
interface SchoolClassService : BaseService<SchoolClassDto> {

    /**
     *This function returns all SchoolClasses owned by the current user
     * @return the current users [SchoolClassDto]s
     */
    fun readAllByUser(): List<SchoolClassDto>

}
