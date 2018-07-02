package outcobra.server.model.dto.mark

import outcobra.server.model.dto.ColorDto
import outcobra.server.model.dto.MarkGroupDto
import outcobra.server.model.dto.SchoolClassDto
import java.time.LocalDate

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
data class SemesterMarkDto(val id: Long = 0,
                           val name: String = "",
                           val validFrom: LocalDate = LocalDate.now(),
                           val validTo: LocalDate = LocalDate.now(),
                           val schoolClass: SchoolClassDto,
                           val value: Double = 0.0,
                           val subjects: List<SubjectMarkDto> = listOf())

/**
 * @author Florian Bürgi
 * @since 1.2.0
 */
data class SubjectMarkDto(val id: Long = 0,
                          val name: String = "",
                          val color: ColorDto = ColorDto(),
                          val subjectMarkGroup: MarkGroupDto = MarkGroupDto())