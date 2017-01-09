package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.SemesterDto
import outcobra.server.service.SemesterService
import javax.inject.Inject

@RestController
@RequestMapping("/api")
open class SemesterController @Inject constructor(val semesterService: SemesterService) {

    @PutMapping(value = "/semester")
    fun createSemester(@RequestBody semesterDto: SemesterDto): SemesterDto {
        return semesterService.createSemester(semesterDto)
    }

    @GetMapping(value = "/semester/{id}")
    fun readSemesterById(@PathVariable id: Long): SemesterDto {
        return semesterService.readSemesterById(id)
    }

    @GetMapping(value = "/schoolYear/{schoolYearId}/semester")
    fun readAllSemestersBySchoolYear(@PathVariable schoolYearId: Long): List<SemesterDto> {
        return semesterService.readAllSemestersBySchoolYear(schoolYearId)
    }

    @PostMapping(value = "/semester")
    fun updateSemester(@RequestBody semesterDto: SemesterDto): SemesterDto {
        return semesterService.updateSemester(semesterDto)
    }

    @DeleteMapping(value = "/semester/{id}")
    fun deleteSemester(@PathVariable id: Long) {
        semesterService.deleteSemester(id)
    }
}
