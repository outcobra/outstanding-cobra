package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.InstitutionDto
import outcobra.server.service.InstitutionService
import javax.inject.Inject


@RestController
@RequestMapping("/api/institution")
class InstitutionController @Inject constructor(val institutionService: InstitutionService) {

    @PutMapping(value = "")
    fun createInstitution(@RequestBody institutionDto: InstitutionDto): InstitutionDto {
        return institutionService.createInstitution(institutionDto)
    }

    @GetMapping(value = "/{id}")
    fun readInstitutionById(@PathVariable id: Long): InstitutionDto {
        return institutionService.readInstitutionById(id)
    }

    @PostMapping(value = "")
    fun updateInstitution(@RequestBody institutionDto: InstitutionDto): InstitutionDto {
        return institutionService.updateInstitution(institutionDto)
    }

    @GetMapping(value = "")
    fun readAllInstitutions(): List<InstitutionDto> {
        return institutionService.readAllInstitutions()
    }

    @DeleteMapping(value = "/{id}")
    fun deleteInstitution(@PathVariable id: Long) {
        institutionService.deleteInstitution(id)
    }
}