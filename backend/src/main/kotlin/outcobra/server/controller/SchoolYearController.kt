package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.service.SchoolYearService
import javax.inject.Inject

@RestController
@RequestMapping("/api")
class SchoolYearController @Inject constructor(val schoolYearService: SchoolYearService) {
    @PutMapping(value = "/schoolYear")
    fun createSchoolYear(@RequestBody schoolYearDto: SchoolYearDto): SchoolYearDto {
        return schoolYearService.createSchoolYear(schoolYearDto)
    }

    @GetMapping(value = "/schoolYear/{id}")
    fun readSchoolYearById(@PathVariable id: Long): SchoolYearDto {
        return schoolYearService.readSchoolYearById(id)
    }

    @GetMapping(value = "/schoolClass/{schoolClassId}/schoolYear")
    fun readAllYearsByClass(@PathVariable schoolClassId: Long): List<SchoolYearDto> {
        return schoolYearService.readAllYearsByClass(schoolClassId)
    }

    @PostMapping(value = "/schoolYear")
    fun updateSchoolYear(@RequestBody schoolYearDto: SchoolYearDto): SchoolYearDto {
        return schoolYearService.updateSchoolYear(schoolYearDto)
    }

    @DeleteMapping(value = "/schoolYear/{id}")
    fun deleteSchoolYear(@PathVariable id: Long) {
        schoolYearService.deleteSchoolYear(id)
    }
}