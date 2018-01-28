package outcobra.server.web.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SemesterDto
import outcobra.server.service.SemesterService
import javax.inject.Inject

@RestController
@RequestMapping("/api")
class SemesterController @Inject constructor(val semesterService: SemesterService) {

    @RequestMapping("/semester", method = arrayOf(RequestMethod.POST, RequestMethod.PUT))
    fun saveSemester(@RequestBody semesterDto: SemesterDto): SemesterDto {
        return semesterService.save(semesterDto)
    }

    @GetMapping("/semester")
    fun readAllByUser(): List<SemesterDto> {
        return semesterService.readAllByUser()
    }

    @GetMapping("/semester/{id}")
    fun readSemesterById(@PathVariable id: Long): SemesterDto {
        return semesterService.readById(id)
    }

    @GetMapping("/schoolYear/{schoolYearId}/semester")
    fun readAllSemestersBySchoolYear(@PathVariable schoolYearId: Long): List<SemesterDto> {
        return semesterService.readAllBySchoolYear(schoolYearId)
    }

    @DeleteMapping("/semester/{id}")
    fun deleteSemester(@PathVariable id: Long) {
        semesterService.delete(id)
    }
}
