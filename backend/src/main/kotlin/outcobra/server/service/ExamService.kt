package outcobra.server.service

import outcobra.server.model.dto.ExamDto
import outcobra.server.service.base.BaseService

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
interface ExamService : BaseService<ExamDto> {
    fun readAllBySemester(semesterId: Long): List<ExamDto>
    fun readAll(): List<ExamDto>
    fun readAllInActiveSemesters(): List<ExamDto>
}




