package outcobra.server.service

import outcobra.server.model.dto.ExamTaskDto
import outcobra.server.service.base.BaseService

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
interface ExamTaskService : BaseService<ExamTaskDto> {
    fun saveAll(examTasks: List<ExamTaskDto>): List<ExamTaskDto>
    fun readByExamId(examId: Long): List<ExamTaskDto>
    fun changeState(examTaskId: Long): ExamTaskDto
}