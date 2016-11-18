package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto

/**
 * Maps [Semester]s to [SemesterDto]s and back
 *
 * @author Florian Bürgi
 * @since <since>
 */
@Component
open class SemesterMapper : Mapper<Semester, SemesterDto> {
    override fun toDto(from: Semester): SemesterDto {
        throw UnsupportedOperationException()
    }

    override fun fromDto(from: SemesterDto): Semester {
        throw UnsupportedOperationException()
    }
}