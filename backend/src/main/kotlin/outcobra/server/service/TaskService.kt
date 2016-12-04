package outcobra.server.service

import outcobra.server.model.dto.TaskDto

/**
 * This service handles the business-logic for the [Task] entity
 * @since <version>
 * @author Vincent Perret
 */
interface TaskService {
    /**
     * This function saves a new [Task]
     * @param taskDto the [TaskDto] you want to store in the database
     * @return the stored [TaskDto]
     */
    fun createTask(taskDto: TaskDto) : TaskDto

    /**
     * This function reads a [Task] based on its id
     * @param id The id of the [Task] to read
     * @return The requested [Task] or null if it does not exist
     */
    fun readTaskById(id : Long) : TaskDto

    /**
     * Reads all [Task]s that are associated with a specific [Subject]
     * @param subjectId The id of the [Subject] of which to retrieve all tasks
     * @return All [Task]s that are associated with the given [Subject]
     */
    fun readAllTasksOfSubject(subjectId : Long) : List<TaskDto>

    /**
     * Reads all [Task]s that are associated with a specific [Semester]
     * @param semesterId The id of the [Semester] of which to retrieve all tasks
     * @return All [Task]s that are associated with the given [Semester]
     */
    fun readAllTasksOfSemester(semesterId : Long) : List<TaskDto>

    /**
     * Reads all [Task]s of which the dueDate is expired
     *@return All [Task]s which have the dueDate after now
     */
    fun readAllOpenTasks() : List<TaskDto>

    /**
     *Reads all [Task]s that are associated with a specific [Semester] and have their dueDate expired
     * @param semesterId The id of the [Semester] of which to retrive [Task]s
     * @return All [Task]s that are associated with the given [Semester] and have the dueDate after now
     */
    fun readAllOpenTasksBySemester(semesterId: Long): List<TaskDto>

    /**
     * Updates an existing task
     * @param taskDto the [TaskDto] to update the existing task with
     * @return The updated Task from the database
     */
    fun updateTask(taskDto: TaskDto) : TaskDto

    /**
     * Deletes a Task specified by its id
     * @param id The id of the Task to delete
     */
    fun deleteTask(id: Long)
}