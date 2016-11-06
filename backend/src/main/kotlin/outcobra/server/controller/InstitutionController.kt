package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.service.InstitutionService
import javax.inject.Inject


@RestController
@RequestMapping("/api/institution")
class InstitutionController @Inject constructor(val institutionService: InstitutionService) {

    @RequestMapping(method = arrayOf(RequestMethod.POST))
    fun saveInstitution(@RequestBody institutionDto: InstitutionDto) {
        institutionService.createInstitution(institutionDto.institutionName)
    }

    @RequestMapping(value = "{id}", method = arrayOf(RequestMethod.GET))
    fun getInstitutionById(@PathVariable("id") id: Long): InstitutionDto {
        return institutionService.getInstitutionById(id)
    }

}