package outcobra.server.service

import outcobra.server.model.dto.ExamDto
import outcobra.server.model.dto.filter.ExamFilterDto
import outcobra.server.service.base.BaseService

/**
 * @author Florian Bürgi
 * @since <since>
 */
interface ExamService : BaseService<ExamDto> {
    fun readAllBySemester(semesterId: Long): List<ExamDto>
    fun readAllByFilter(filter: ExamFilterDto): List<ExamDto>
}

