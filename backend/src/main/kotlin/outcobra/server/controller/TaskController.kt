package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.TaskDto
import outcobra.server.model.dto.TaskFilterDto
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
        return taskService.readAllTasks()
    }

    @PutMapping(value = "/task")
    fun createTask(@RequestBody taskDto: TaskDto): TaskDto {
        return taskService.createTask(taskDto)
    }

    @GetMapping(value = "/task/{id}")
    fun readTaskById(@PathVariable id: Long): TaskDto {
        return taskService.readTaskById(id)
    }

    @GetMapping(value = "/subject/{subjectId}/task")
    fun readAllTasksOfSubject(@PathVariable subjectId: Long): List<TaskDto> {
        return taskService.readAllTasksOfSubject(subjectId)
    }

    @GetMapping(value = "/semester/{semesterId}/task")
    fun readAllTasksOfSemester(@PathVariable semesterId: Long): List<TaskDto> {
        return taskService.readAllTasksOfSemester(semesterId)
    }

    @GetMapping(value = "/subject/{subjectId}/task/open")
    fun readAllOpenTasksBySubject(@PathVariable subjectId: Long): List<TaskDto> {
        return taskService.readAllOpenTasksBySubject(subjectId)
    }

    @GetMapping(value = "/semester/{semesterId}/task/open")
    fun readAllOpenTasksBySemester(@PathVariable semesterId: Long): List<TaskDto> {
        return taskService.readAllOpenTasksBySemester(semesterId)
    }

    @PostMapping(value = "/task")
    fun updateTask(@RequestBody taskDto: TaskDto): TaskDto {
        return taskService.updateTask(taskDto)
    }

    @DeleteMapping(value = "/task/{taskId}")
    fun deleteTask(@PathVariable taskId: Long) {
        taskService.deleteTask(taskId)
    }

    @GetMapping(value = "/task/filter")
    fun getTaskFilter(): TaskFilterDto {
        return taskService.getTaskFilter()
    }
}