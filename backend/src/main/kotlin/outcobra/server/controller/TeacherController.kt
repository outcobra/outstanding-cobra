package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.TeacherDto
import outcobra.server.service.TeacherService
import javax.inject.Inject

@RestController
@RequestMapping("/api")
open class TeacherController @Inject constructor(val teacherService: TeacherService) : TeacherService {
    @PutMapping(value = "/teacher")
    override fun createTeacher(@RequestBody teacherDto: TeacherDto): TeacherDto {
        return teacherService.createTeacher(teacherDto)
    }

    @GetMapping(value = "/teacher/{id}")
    override fun readTeacherById(@PathVariable id: Long): TeacherDto {
        return teacherService.readTeacherById(id)
    }

    @GetMapping(value = "/institution/{institutionId}/teacher")
    override fun readAllYearsByInstitution(@PathVariable institutionId: Long): List<TeacherDto> {
        return teacherService.readAllYearsByInstitution(institutionId)
    }

    @PostMapping(value = "/teacher")
    override fun updateTeacher(@RequestBody teacherDto: TeacherDto): TeacherDto {
        return teacherService.updateTeacher(teacherDto)
    }

    @DeleteMapping(value = "/teacher/{id}")
    override fun deleteTeacher(@PathVariable id: Long) {
        teacherService.deleteTeacher(id)
    }
}