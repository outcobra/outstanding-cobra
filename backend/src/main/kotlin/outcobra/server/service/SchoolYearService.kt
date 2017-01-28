package outcobra.server.service

import outcobra.server.model.dto.SchoolYearDto
import outcobra.server.service.base.BaseService

/**
 * Service which contains all business logic for the SchoolYear entity
 *
 * @author Florian Bürgi
 * @since 1.0.0
 */
interface SchoolYearService : BaseService<SchoolYearDto> {

    /**
     * Reads all SchoolYears that are associated with a specific SchoolClass
     * @param schoolClassId The id of the SchoolClass of which to read all SchoolYears
     * @return All SchoolYears that are associated with the given SchoolClass
     */
    fun readAllBySchoolClass(schoolClassId: Long): List<SchoolYearDto>

}