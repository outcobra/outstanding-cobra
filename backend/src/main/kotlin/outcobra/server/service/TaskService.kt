package outcobra.server.service

import outcobra.server.model.Semester
import outcobra.server.model.Subject
import outcobra.server.model.Task
import outcobra.server.model.dto.TaskDto
import outcobra.server.model.dto.TaskFilterDto
import outcobra.server.service.base.BaseService

/**
 * This service handles the business-logic for the [Task] entity
 * @since <since>
 * @author Vincent Perret
 */
interface TaskService : BaseService<TaskDto> {

    /**
     * Reads all [Task]s that are associated with a specific [Subject]
     * @param subjectId The id of the [Subject] of which to retrieve all tasks
     * @return All [Task]s that are associated with the given [Subject]
     */
    fun readAllBySubject(subjectId: Long): List<TaskDto>

    /**
     * Reads all [Task]s that are associated with a specific [Semester]
     * @param semesterId The id of the [Semester] of which to retrieve all tasks
     * @return All [Task]s that are associated with the given [Semester]
     */
    fun readAllSemester(semesterId: Long): List<TaskDto>

    /**
     * Reads all [Task]s of which the dueDate is not expired from the given subject
     * @param subjectId the id of the subject you want to use as a filter
     * @return All [Task]s which have the dueDate after now
     */
    fun readAllOpenBySubject(subjectId: Long): List<TaskDto>

    /**
     * Reads all [Task]s that are associated with a specific [Semester] and have their dueDate not expired
     * @param semesterId The id of the [Semester] of which to retrieve [Task]s
     * @return All [Task]s that are associated with the given [Semester] and have the dueDate after now
     */
    fun readAllOpenBySemester(semesterId: Long): List<TaskDto>

    /**
     * Reads all [Task]s of the current user
     */
    fun readAllTasks(): List<TaskDto>

    /**
     * @return a [TaskFilterDto] for the current user
     */
    fun getTaskFilter(): TaskFilterDto
}