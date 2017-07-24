package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.ExamTaskDto
import outcobra.server.service.ExamTaskService
import javax.inject.Inject

/**
 * @author Florian Bürgi
 * @since <since>
 */
@RestController
@RequestMapping("/api")
class ExamTaskController @Inject constructor(val service: ExamTaskService) {

    @GetMapping("/examTask/{id}")
    fun readTaskExamById(@PathVariable id: Long): ExamTaskDto {
        return service.readById(id)
    }

    @PutMapping("/all/examTask")
    fun saveAllExamTasks(@RequestBody tasks: List<ExamTaskDto>): List<ExamTaskDto> {
        return service.saveAll(tasks)
    }

    @PostMapping("/state/examTask")
    fun changeExamTaskState(@RequestBody id: Long): ExamTaskDto {
        return service.changeState(id)
    }

    @RequestMapping("/examTask", method = arrayOf(RequestMethod.PUT, RequestMethod.POST))
    fun saveExamTask(@RequestBody dto: ExamTaskDto): ExamTaskDto {
        return service.save(dto)
    }

    @DeleteMapping("/examTask/{id}")
    fun deleteExamTaskId(@PathVariable id: Long) {
        service.delete(id)
    }
}