package outcobra.server.web.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.ExamDto
import outcobra.server.service.ExamService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
@RestController
@RequestMapping("/api")
class ExamController @Inject constructor(val examService: ExamService) {

    @RequestMapping("/exam", method = arrayOf(RequestMethod.PUT, RequestMethod.POST))
    fun saveExam(@RequestBody examDto: ExamDto): ExamDto {
        return examService.save(examDto)
    }

    // TODO not really accurate naming imho
    @GetMapping("/exam/active")
    fun readAllActive(): List<ExamDto> {
        return examService.readAllInActiveSemesters()
    }

    @GetMapping("/exam/{id}")
    fun readExamById(@PathVariable id: Long): ExamDto {
        return examService.readById(id)
    }

    @GetMapping("/exam")
    fun readAll(): List<ExamDto> {
        return examService.readAll()
    }

    @GetMapping("/semester/{semesterId}/exam")
    fun readAllBySemester(@PathVariable semesterId: Long): List<ExamDto> {
        return examService.readAllBySemester(semesterId)
    }

    @DeleteMapping("/exam/{id}")
    fun deleteExam(@PathVariable id: Long) {
        examService.delete(id)
    }
}