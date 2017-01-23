package outcobra.server.service

import outcobra.server.model.dto.TeacherDto
import outcobra.server.service.base.BaseService

/**
 * Service which handles all business logic and data for Teacher entities
 *
 * @author Florian Bürgi
 * @since 1.0.0
 */
interface TeacherService : BaseService<TeacherDto> {
    /**
     * Returns all Teachers that are associated to a specific Institution
     * @param institutionId The id of the Institution of which the Teachers should be retrieved
     * @return A list of Teachers that are associated with the given Institution
     */
    fun readAllByInstitution(institutionId: Long): List<TeacherDto>
}