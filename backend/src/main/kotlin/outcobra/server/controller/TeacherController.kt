package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.TeacherDto
import outcobra.server.service.TeacherService
import javax.inject.Inject

@RestController
@RequestMapping("/api")
open class TeacherController @Inject constructor(val teacherService: TeacherService) : TeacherService {
    @RequestMapping(value = "/teacher", method = arrayOf(RequestMethod.PUT))
    override fun createTeacher(@RequestBody teacherDto: TeacherDto): TeacherDto {
        return teacherService.createTeacher(teacherDto)
    }

    @RequestMapping(value = "/teacher/{id}", method = arrayOf(RequestMethod.GET))
    override fun readTeacherById(@PathVariable id: Long): TeacherDto {
        return teacherService.readTeacherById(id)
    }

    @RequestMapping(value = "/institution/{institutionId}/teacher", method = arrayOf(RequestMethod.GET))
    override fun readAllYearsByInstitution(@PathVariable institutionId: Long): List<TeacherDto> {
        return teacherService.readAllYearsByInstitution(institutionId)
    }

    @RequestMapping(value = "/teacher", method = arrayOf(RequestMethod.POST))
    override fun updateTeacher(@RequestBody teacherDto: TeacherDto): TeacherDto {
        return teacherService.updateTeacher(teacherDto)
    }

    @RequestMapping(value = "/teacher/{id}", method = arrayOf(RequestMethod.DELETE))
    override fun deleteTeacher(@PathVariable id: Long) {
        teacherService.deleteTeacher(id)
    }
}