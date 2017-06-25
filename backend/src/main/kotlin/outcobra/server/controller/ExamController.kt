package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.ExamDto
import outcobra.server.service.ExamService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@RestController
@RequestMapping("/api/exam")
class ExamController @Inject constructor(val examService: ExamService) {

    @RequestMapping(value = "", method = arrayOf(RequestMethod.PUT, RequestMethod.POST))
    fun saveExam(@RequestBody examDto: ExamDto): ExamDto {
        return examService.save(examDto)
    }

    @GetMapping("/{id}")
    fun readExamById(@PathVariable id: Long): ExamDto {
        return examService.readById(id)
    }

    @GetMapping("/semester/{semesterId}")
    fun readAllBySemester(@PathVariable semesterId: Long): List<ExamDto> {
        return examService.readAllBySemester(semesterId)
    }

    @GetMapping("/all")
    fun readAll(): List<ExamDto> {
        return examService.readAll()
    }


}