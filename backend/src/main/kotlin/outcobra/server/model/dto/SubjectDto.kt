package outcobra.server.model.dto

import outcobra.server.model.Semester
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

/**
 * Created by Florian on 26.11.2016.
 */
data class SubjectDto(val subjectId: Long = 0,
                      val semesterId: Long = 0,
                      val subjectName: String = "",
                      val teacher: TeacherDto? = null) : OutcobraDto{
    override fun getId(): Long = semesterId

    override fun getParentLink(): ParentLink = ParentLink.make(semesterId, Semester::class.java)
}