package outcobra.server.service

import outcobra.server.model.dto.SchoolClassSubjectDto
/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
interface SchoolClassSubjectService {

    /**
     * @return a list of [SchoolClassSubjectDto]'s for the current user
     */
    fun getSchoolClassSubjects(): List<SchoolClassSubjectDto>
}