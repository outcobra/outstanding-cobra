package outcobra.server.controller

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.service.InstitutionService
import javax.inject.Inject

/**
 * Created by Florian on 29.10.2016.
 */

@RestController
@RequestMapping("/api/institution")
class InstitutionEndpoint @Inject constructor(val institutionService: InstitutionService) {

}