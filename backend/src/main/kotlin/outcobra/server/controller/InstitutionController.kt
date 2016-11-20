package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.service.InstitutionService
import javax.inject.Inject


@RestController
@RequestMapping("/api/institution")
class InstitutionController @Inject constructor(val institutionService: InstitutionService) {

    @RequestMapping(value = "/", method = arrayOf(RequestMethod.PUT))
    fun createInstitution(@RequestBody institutionDto: InstitutionDto) {
        institutionService.createInstitution(institutionDto)
    }

    @RequestMapping(value = "/{id}", method = arrayOf(RequestMethod.GET))
    fun readInstitutionById(@PathVariable id: Long): InstitutionDto {
        return institutionService.readInstitutionById(id)
    }

    @RequestMapping(method = arrayOf(RequestMethod.POST))
    fun updateInstitution(@RequestBody institutionDto: InstitutionDto): InstitutionDto {
        return institutionService.updateInstitution(institutionDto)
    }

    @RequestMapping(value = "/", method = arrayOf(RequestMethod.GET))
    fun readAllInstitutions(): List<InstitutionDto> {
        return institutionService.readAllInstitutions()
    }

    @RequestMapping(value = "/{id}", method = arrayOf(RequestMethod.DELETE))
    fun deleteInstitution(@PathVariable id: Long) {
        institutionService.deleteInstitution(id)
    }
}