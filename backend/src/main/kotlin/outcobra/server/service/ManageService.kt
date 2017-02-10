package outcobra.server.service

import outcobra.server.model.dto.manage.ManageDto

/**
 * Service which handles all the business logic for the manage endpoint
 */
interface ManageService {
    /**
     * Creates a [ManageDto] which contains multiple things that are required for the manage ui
     */
    fun getManageData(): ManageDto
}