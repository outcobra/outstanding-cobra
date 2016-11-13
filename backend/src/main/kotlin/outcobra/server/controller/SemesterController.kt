package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SemesterDto
import outcobra.server.service.SemesterService
import javax.inject.Inject

/**
 * Created by Florian on 13.11.2016.
 */
@RestController
@RequestMapping("/api")
open class SemesterController @Inject constructor(val semesterService: SemesterService) {

    @RequestMapping(value = "/semester", method = arrayOf(RequestMethod.PUT))
    fun createSemester(@RequestBody semesterDto: SemesterDto): SemesterDto {
        throw UnsupportedOperationException("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    @RequestMapping(value = "/semester/{id}", method = arrayOf(RequestMethod.GET))
    fun readSemesterById(@PathVariable id: Long): SemesterDto {
        return semesterService.readSemesterById(id)
    }
    @RequestMapping(value = "/schoolYear/{schoolYearId}/semester", method = arrayOf(RequestMethod.GET))
    fun readAllSemestersBySchoolYear(schoolYearId: Long): List<SemesterDto> {
        return semesterService.readAllSemestersBySchoolYear(schoolYearId)
    }
    @RequestMapping(value = "/semester", method = arrayOf(RequestMethod.POST))
    fun updateSemester(@RequestBody semesterDto: SemesterDto): SemesterDto {
        return semesterService.updateSemester(semesterDto)
    }

    @RequestMapping(value = "/semester/{id}", method = arrayOf(RequestMethod.GET))
    fun deleteSemester(@PathVariable id: Long) {
        semesterService.deleteSemester(id)
    }
}
