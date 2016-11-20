package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SemesterDto
import outcobra.server.service.SemesterService
import javax.inject.Inject

@RestController
@RequestMapping("/api")
open class SemesterController @Inject constructor(val semesterService: SemesterService) {

    @RequestMapping(value = "/semester", method = arrayOf(RequestMethod.PUT))
    fun createSemester(@RequestBody semesterDto: SemesterDto): SemesterDto {
        return semesterService.createSemester(semesterDto)
    }

    @RequestMapping(value = "/semester/{id}", method = arrayOf(RequestMethod.GET))
    fun readSemesterById(@PathVariable id: Long): SemesterDto {
        return semesterService.readSemesterById(id)
    }

    @RequestMapping(value = "/schoolYear/{schoolYearId}/semester", method = arrayOf(RequestMethod.GET))
    fun readAllSemestersBySchoolYear(@PathVariable schoolYearId: Long): List<SemesterDto> {
        return semesterService.readAllSemestersBySchoolYear(schoolYearId)
    }

    @RequestMapping(value = "/semester", method = arrayOf(RequestMethod.POST))
    fun updateSemester(@RequestBody semesterDto: SemesterDto): SemesterDto {
        return semesterService.updateSemester(semesterDto)
    }

    @RequestMapping(value = "/semester/{id}", method = arrayOf(RequestMethod.DELETE))
    fun deleteSemester(@PathVariable id: Long) {
        semesterService.deleteSemester(id)
    }
}
