package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.service.InstitutionService
import javax.inject.Inject


@RestController
@RequestMapping("/api/institution")
class InstitutionController @Inject constructor(val institutionService: InstitutionService) {

    @RequestMapping(value = "", method = arrayOf(RequestMethod.PUT, RequestMethod.POST))
    fun saveInstitution(@RequestBody institutionDto: InstitutionDto): InstitutionDto {
        return institutionService.save(institutionDto)
    }

    @GetMapping(value = "/{id}")
    fun readInstitutionById(@PathVariable id: Long): InstitutionDto {
        return institutionService.readById(id)
    }

    @GetMapping(value = "")
    fun readAllInstitutions(): List<InstitutionDto> {
        return institutionService.readAll()
    }

    @DeleteMapping(value = "/{id}")
    fun deleteInstitution(@PathVariable id: Long) {
        institutionService.delete(id)
    }
}