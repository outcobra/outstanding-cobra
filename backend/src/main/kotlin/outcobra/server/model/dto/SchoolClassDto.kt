package outcobra.server.model.dto

import outcobra.server.model.domain.Institution
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink

data class SchoolClassDto(val id: Long = 0,
                          val institutionId: Long = 0,
                          val normalizedName: String = "",
                          val schoolYearIds: List<Long> = arrayListOf(),
                          val subjectIds: List<Long> = arrayListOf()) : OutcobraDto {

    override val identifier: Long
        get() = id

    override val parentLink: ParentLink
        get() = ParentLink.make(institutionId, Institution::class.java)
}