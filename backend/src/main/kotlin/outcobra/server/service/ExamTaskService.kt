package outcobra.server.service

import outcobra.server.model.dto.ExamTaskDto
import outcobra.server.service.base.BaseService

/**
 * @author Florian Bürgi
 * @since <since>
 */
interface ExamTaskService : BaseService<ExamTaskDto> {
    fun saveAll(examTasks: List<ExamTaskDto>): List<ExamTaskDto>
    fun changeState(examTaskId: Long): ExamTaskDto
}