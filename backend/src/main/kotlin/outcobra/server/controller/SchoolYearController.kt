package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.service.internal.SchoolYearService
import javax.inject.Inject

/**
 * Created by Florian on 12.11.2016.
 */
@RestController("/api")
class SchoolYearController @Inject constructor(val schoolYearService: SchoolYearService) {
    @RequestMapping(value = "/schoolYear", method = arrayOf(RequestMethod.PUT))
    fun createSchoolYear(@RequestBody schoolYearDto: SchoolYearDto): SchoolYearDto {
        return schoolYearService.createSchoolYear(schoolYearDto)
    }
    @RequestMapping(value = "/schoolYear/{id}", method = arrayOf(RequestMethod.GET))
    fun readSchoolYearById(@PathVariable id: Long): SchoolYearDto {
        return schoolYearService.readSchoolYearById(id)
    }

    @RequestMapping(value = "/schoolClass/{schoolClassId}/schoolYear", method = arrayOf(RequestMethod.GET))
    fun readAllYearsByClass(@PathVariable schoolClassId: Long): List<SchoolYearDto> {
        return schoolYearService.readAllYearsByClass(schoolClassId)
    }
    @RequestMapping(value = "/schoolYear", method = arrayOf(RequestMethod.POST))
    fun updateSchoolYear(@RequestBody schoolYearDto: SchoolYearDto): SchoolYearDto {
        return schoolYearService.updateSchoolYear(schoolYearDto)
    }
    @RequestMapping(value = "/schoolYear/{id}", method = arrayOf(RequestMethod.DELETE))
    fun deleteSchoolYear(id: Long) {
        schoolYearService.deleteSchoolYear(id)
    }
}