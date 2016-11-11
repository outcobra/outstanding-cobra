package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.service.InstitutionService
import javax.inject.Inject


@RestController
@RequestMapping("/api/institution")
class InstitutionController @Inject constructor(val institutionService: InstitutionService) {

    @RequestMapping(method = arrayOf(RequestMethod.PUT))
    fun createInstitution(@RequestBody institutionDto: InstitutionDto) {
        institutionService.createInstitution(institutionDto.institutionName)
    }

    @RequestMapping(value = "{id}", method = arrayOf(RequestMethod.GET))
    fun readInstitutionById(@PathVariable("id") id: Long): InstitutionDto {
        return institutionService.readInstitutionById(id)
    }

    @RequestMapping(method = arrayOf(RequestMethod.POST))
    fun updateInstitution(@RequestBody institutionDto: InstitutionDto): InstitutionDto {
        return institutionService.updateInstitution(institutionDto)
    }

    @RequestMapping(method = arrayOf(RequestMethod.GET))
    fun readAllInstitutions() : List<InstitutionDto>{
        return institutionService.readAllInstitutions()
    }
}