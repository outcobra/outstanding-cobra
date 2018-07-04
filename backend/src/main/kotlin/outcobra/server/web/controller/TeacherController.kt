package outcobra.server.web.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.TeacherDto
import outcobra.server.service.TeacherService
import javax.inject.Inject

@RestController
@RequestMapping("/api")
class TeacherController @Inject constructor(val teacherService: TeacherService) {
    @RequestMapping("/teacher", method = arrayOf(RequestMethod.POST, RequestMethod.PUT))
    fun saveTeacher(@RequestBody teacherDto: TeacherDto): TeacherDto {
        return teacherService.save(teacherDto)
    }

    @GetMapping("/teacher/{id}")
    fun readTeacherById(@PathVariable id: Long): TeacherDto {
        return teacherService.readById(id)
    }

    @DeleteMapping("/teacher/{id}")
    fun deleteTeacher(@PathVariable id: Long) {
        teacherService.delete(id)
    }
}