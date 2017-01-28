package outcobra.server.service

import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto
import outcobra.server.service.base.BaseService

/**
 * Service which handles the business logic and data for [Semester]s
 *
 * @author Florian Bürgi
 * @since 1.0.0
 */
interface SemesterService : BaseService<SemesterDto> {

    /**
     * Reads all semesters that are associated with a specific SchoolYear
     * @param schoolYearId The id of the SchoolYear of which to retrieve all semesters
     * @return All semesters that are associated with the given SchoolYear
     */
    fun readAllBySchoolYear(schoolYearId: Long): List<SemesterDto>

    /**
     * This function returns all current semesters
     * @return a list of [SemesterDto]
     */

    fun getCurrentSemester(): List<SemesterDto>
}