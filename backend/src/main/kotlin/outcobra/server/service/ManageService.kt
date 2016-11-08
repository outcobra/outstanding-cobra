package outcobra.server.service

import outcobra.server.model.dto.manage.ManageDto

interface ManageService {
    fun getManageData(): ManageDto
}