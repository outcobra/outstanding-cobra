package outcobra.server.model.dto.mark

import outcobra.server.model.dto.ColorDto
import outcobra.server.model.dto.MarkGroupDto
import java.time.LocalDate

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class SemesterMarkDto(val id: Long = 0,
                           val name: String = "",
                           val validFrom: LocalDate? = null,
                           val validTo: LocalDate? = null,
                           val subjects: List<SubjectMarkDto> = listOf())

/**
 * @author Florian Bürgi
 * @since <since>
 */
data class SubjectMarkDto(val id: Long = 0,
                          val name: String = "",
                          val color: ColorDto = ColorDto(),
                          val subjectMarkGroup: MarkGroupDto = MarkGroupDto())