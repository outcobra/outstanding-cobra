package outcobra.server.service

import outcobra.server.model.dto.filter.SubjectFilterDto

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
interface FilterService {

    /**
     * @return a [SubjectFilterDto] for the current user
     */
    fun getSubjectFilter(): SubjectFilterDto
}