package outcobra.server.model.dto

import outcobra.server.model.Semester
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

/**
 * Created by Florian on 26.11.2016.
 */
data class SubjectDto(val id: Long = 0,
                      val semesterId: Long = 0,
                      val name: String = "",
                      val teacherId: Long = 0) : OutcobraDto {
    override fun getIdentifier(): Long = id

    override fun getParentLink(): ParentLink = ParentLink.make(semesterId, Semester::class.java)
}