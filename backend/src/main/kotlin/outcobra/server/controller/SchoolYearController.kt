package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.service.SchoolYearService
import javax.inject.Inject

@RestController
@RequestMapping("/api")
class SchoolYearController @Inject constructor(val schoolYearService: SchoolYearService) {
    @RequestMapping(value = "/schoolYear", method = arrayOf(RequestMethod.POST, RequestMethod.PUT))
    fun saveSchoolYear(@RequestBody schoolYearDto: SchoolYearDto): SchoolYearDto {
        return schoolYearService.save(schoolYearDto)
    }

    @GetMapping(value = "/schoolYear/{id}")
    fun readSchoolYearById(@PathVariable id: Long): SchoolYearDto {
        return schoolYearService.readById(id)
    }

    @GetMapping(value = "/schoolClass/{schoolClassId}/schoolYear")
    fun readAllYearsByClass(@PathVariable schoolClassId: Long): List<SchoolYearDto> {
        return schoolYearService.readAllYearsByClass(schoolClassId)
    }

    @DeleteMapping(value = "/schoolYear/{id}")
    fun deleteSchoolYear(@PathVariable id: Long) {
        schoolYearService.delete(id)
    }
}