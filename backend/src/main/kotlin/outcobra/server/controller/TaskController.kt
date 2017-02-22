package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.TaskDto
import outcobra.server.model.dto.TaskFilterDto
import outcobra.server.model.dto.TaskProgressUpdateDto
import outcobra.server.service.TaskService
import javax.inject.Inject

/**
 * @author Vincent Perret
 */
@RestController
@RequestMapping("/api")
open class TaskController @Inject constructor(val taskService: TaskService) {

    @GetMapping(value = "/task")
    fun getAllTasks(): List<TaskDto> {
        return taskService.readAll()
    }

    @RequestMapping(value = "/task", method = arrayOf(RequestMethod.POST, RequestMethod.PUT))
    fun saveTask(@RequestBody taskDto: TaskDto): TaskDto {
        return taskService.save(taskDto)
    }

    @GetMapping(value = "/task/{id}")
    fun readTaskById(@PathVariable id: Long): TaskDto {
        return taskService.readById(id)
    }

    @GetMapping(value = "/subject/{subjectId}/task")
    fun readAllTasksBySubject(@PathVariable subjectId: Long): List<TaskDto> {
        return taskService.readAllBySubject(subjectId)
    }

    @GetMapping(value = "/semester/{semesterId}/task")
    fun readAllTasksBySemester(@PathVariable semesterId: Long): List<TaskDto> {
        return taskService.readAllBySemester(semesterId)
    }

    @GetMapping(value = "/subject/{subjectId}/task/open")
    fun readAllOpenTasksBySubject(@PathVariable subjectId: Long): List<TaskDto> {
        return taskService.readAllOpenBySubject(subjectId)
    }

    @GetMapping(value = "/semester/{semesterId}/task/open")
    fun readAllOpenTasksBySemester(@PathVariable semesterId: Long): List<TaskDto> {
        return taskService.readAllOpenBySemester(semesterId)
    }

    @DeleteMapping(value = "/task/{taskId}")
    fun deleteTask(@PathVariable taskId: Long) {
        taskService.delete(taskId)
    }

    @GetMapping(value = "/task/filter")
    fun getTaskFilter(): TaskFilterDto {
        return taskService.getTaskFilter()
    }

    @PostMapping(value = "/task/progress")
    fun updateProgress(@RequestBody taskProgressUpdateDto: TaskProgressUpdateDto): TaskDto {
        return taskService.updateProgress(taskProgressUpdateDto)
    }
}