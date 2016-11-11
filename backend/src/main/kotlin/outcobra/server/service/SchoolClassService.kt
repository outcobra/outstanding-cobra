package outcobra.server.service

import outcobra.server.model.dto.SchoolClassDto

/**
 * Created by Florian on 11.11.2016.
 */
 interface SchoolClassService {
    fun createSchoolClass(schoolClassDto: SchoolClassDto) : SchoolClassDto
    fun readSchoolClassById(id :Long) : SchoolClassDto
    fun readAllSchoolClasses() : List<SchoolClassDto>
    fun updateSchoolClass(schoolClassDto: SchoolClassDto): SchoolClassDto
    fun deleteSchoolClass(id: Long)
}