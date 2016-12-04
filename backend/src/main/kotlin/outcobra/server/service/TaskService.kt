package outcobra.server.service

import outcobra.server.model.dto.TaskDto

/**
 * Created by Vincent on 15.11.2016.
 */
interface TaskService {
    fun createTask(taskDto: TaskDto) : TaskDto
    fun readTaskById(id : Long) : TaskDto
    fun readAllTasksOfSubject(subjectId : Long) : List<TaskDto>
    fun readAllTasksOfSemester(semesterId : Long) : List<TaskDto>
    fun updateTask(taskDto: TaskDto) : TaskDto
    fun deleteTask(id: Long)
}