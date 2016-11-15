package outcobra.server.service

import outcobra.server.model.dto.SemesterDto

/**
 * Created by Florian on 13.11.2016.
 */
interface SemesterService {
    fun createSemester(semesterDto: SemesterDto) : SemesterDto
    fun readSemesterById(id : Long) : SemesterDto
    fun readAllSemestersBySchoolYear(schoolYearId : Long) :List<SemesterDto>
    fun updateSemester(semesterDto: SemesterDto) : SemesterDto
    fun deleteSemester(id: Long)
}