package outcobra.server.web.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.service.SchoolYearService
import javax.inject.Inject

@RestController
@RequestMapping("/api")
class SchoolYearController @Inject constructor(val schoolYearService: SchoolYearService) {

    @GetMapping("/schoolYear")
    fun readSchoolYearsByCurrentUser(): List<SchoolYearDto> {
        return schoolYearService.readAllByUser()
    }

    @RequestMapping("/schoolYear", method = [RequestMethod.POST, RequestMethod.PUT])
    fun saveSchoolYear(@RequestBody schoolYearDto: SchoolYearDto): SchoolYearDto {
        return schoolYearService.save(schoolYearDto)
    }

    @GetMapping("/schoolYear/{id}")
    fun readSchoolYearById(@PathVariable id: Long): SchoolYearDto {
        return schoolYearService.readById(id)
    }

    @GetMapping("/schoolClass/{schoolClassId}/schoolYear")
    fun readAllYearsByClass(@PathVariable schoolClassId: Long): List<SchoolYearDto> {
        return schoolYearService.readAllBySchoolClass(schoolClassId)
    }

    @DeleteMapping("/schoolYear/{id}")
    fun deleteSchoolYear(@PathVariable id: Long) {
        schoolYearService.delete(id)
    }

    @PutMapping("/schoolYear/{id}/link/schoolClass/{schoolClassId}")
    fun linkSchoolClass(@PathVariable id: Long, @PathVariable schoolClassId: Long) {
        schoolYearService.linkSchoolClass(id, schoolClassId)
    }
}