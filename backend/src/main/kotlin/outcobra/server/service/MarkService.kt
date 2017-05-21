package outcobra.server.service

import outcobra.server.model.dto.MarkDto
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.service.base.BaseService

/**
 * @author Florian Bürgi
 * @since <since>
 */
interface MarkService : BaseService<MarkDto> {
    fun readAllByMarkGroup(markGroupId: Long): List<MarkDto>
    fun saveMarkAndGetChangedParent(dto: MarkDto): MarkGroupDto
}