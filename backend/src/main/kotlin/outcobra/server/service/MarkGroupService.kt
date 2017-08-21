package outcobra.server.service

import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.mark.SemesterMarkDto
import outcobra.server.service.base.BaseService

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
interface MarkGroupService : BaseService<MarkGroupDto> {
    fun getGroupBySubject(subjectId: Long): MarkGroupDto
    fun getInitialData(semesterId: Long): SemesterMarkDto
}