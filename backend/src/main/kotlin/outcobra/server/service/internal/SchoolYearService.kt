package outcobra.server.service.internal

import outcobra.server.model.dto.SchoolYearDto

/**
 * Created by Florian on 12.11.2016.
 */
interface SchoolYearService {
    fun createSchoolYear(schoolYearDto: SchoolYearDto) : SchoolYearDto
    fun readSchoolYearById(id : Long) : SchoolYearDto
    fun readAllYearsByClass(schoolClassId : Long) : List<SchoolYearDto>
    fun updateSchoolYear(schoolYearDto: SchoolYearDto) :SchoolYearDto
    fun deleteSchoolYear(id : Long)
}