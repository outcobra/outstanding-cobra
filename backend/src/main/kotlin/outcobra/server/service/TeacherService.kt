package outcobra.server.service

import outcobra.server.model.dto.TeacherDto

/**
 * Created by Florian on 13.11.2016.
 */
interface TeacherService {
    fun createTeacher(teacherDto: TeacherDto) : TeacherDto
    fun readTeacherById(id : Long) : TeacherDto
    fun readAllYearsByInstitution(institutionId : Long) : List<TeacherDto>
    fun updateTeacher(teacherDto: TeacherDto) :TeacherDto
    fun deleteTeacher(id : Long)
}