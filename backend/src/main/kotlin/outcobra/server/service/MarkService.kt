package outcobra.server.service

import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.MarkValueDto
import outcobra.server.service.base.BaseService

/**
 * @author Florian Bürgi
 * @since <since>
 */
interface MarkService : BaseService<MarkValueDto> {
    fun readAllByMarkGroup(markGroupId: Long): List<MarkValueDto>
    fun saveMarkAndGetChangedParent(dto: MarkValueDto): MarkGroupDto
    fun readAllBySubject(subjectId: Long): List<MarkValueDto>
}