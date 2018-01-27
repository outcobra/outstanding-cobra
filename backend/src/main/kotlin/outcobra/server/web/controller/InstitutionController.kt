package outcobra.server.web.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.service.InstitutionService
import javax.inject.Inject


@RestController
@RequestMapping("/api/institution")
class InstitutionController @Inject constructor(val institutionService: InstitutionService) {

    @RequestMapping("", method = arrayOf(RequestMethod.PUT, RequestMethod.POST))
    fun saveInstitution(@RequestBody institutionDto: InstitutionDto): InstitutionDto {
        return institutionService.save(institutionDto)
    }

    @GetMapping("/{id}")
    fun readInstitutionById(@PathVariable id: Long): InstitutionDto {
        return institutionService.readById(id)
    }

    @GetMapping("")
    fun readAllInstitutions(): List<InstitutionDto> {
        return institutionService.readAll()
    }

    @DeleteMapping("/{id}")
    fun deleteInstitution(@PathVariable id: Long) {
        institutionService.delete(id)
    }
}