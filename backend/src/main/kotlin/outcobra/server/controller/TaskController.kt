package outcobra.server.controller

import org.springframework.web.bind.annotation.*
import outcobra.server.model.dto.TaskDto
import outcobra.server.service.TaskService
import javax.inject.Inject

/**
 * Created by Vincent on 15.11.2016.
 */
@RestController
@RequestMapping("/api")
open class TaskController @Inject constructor(val taskService: TaskService){

    @RequestMapping(value = "/task", method = arrayOf(RequestMethod.PUT))
    fun createTask(@RequestBody taskDto: TaskDto): TaskDto {
        throw UnsupportedOperationException("not implemented")
        //TODO Implement create
    }

    @RequestMapping(value = "/task/{id}", method = arrayOf(RequestMethod.GET))
    fun readTaskById(@PathVariable id: Long): TaskDto {
        return taskService.readTaskById(id)
    }

    @RequestMapping(value = "/subject/{subjectId}/task", method = arrayOf(RequestMethod.GET))
    fun readAllTasksOfSubject(@PathVariable subjectId: Long): List<TaskDto> {
        return taskService.readAllTasksOfSubject(subjectId)
    }

    @RequestMapping(value = "/semester/{semesterId}/task", method = arrayOf(RequestMethod.GET))
    fun readAllTasksOfSemester(@PathVariable semesterId: Long): List<TaskDto> {
        return taskService.readAllTasksOfSemester(semesterId)
    }

    @RequestMapping(value = "/task", method = arrayOf(RequestMethod.POST))
    fun updateTask(@RequestBody taskDto: TaskDto): TaskDto {
        return taskService.updateTask(taskDto)
    }

    @RequestMapping(value = "/task", method = arrayOf(RequestMethod.DELETE))
    fun deleteTask(@PathVariable id: Long) {
        taskService.deleteTask(id)
    }
}