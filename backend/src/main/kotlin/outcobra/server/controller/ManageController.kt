package outcobra.server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.model.dto.manage.ManageDto
import outcobra.server.service.ManageService
import javax.inject.Inject

@RestController
@RequestMapping("/api/manage")
class ManageController @Inject constructor(val manageService: ManageService) {

    @GetMapping(value = "")
    fun getManageData(): ManageDto {
        return manageService.getManageData()
    }
}