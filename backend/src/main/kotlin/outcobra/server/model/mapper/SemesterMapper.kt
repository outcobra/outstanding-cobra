package outcobra.server.model.mapper

import org.springframework.stereotype.Component
import outcobra.server.model.Semester
import outcobra.server.model.dto.SemesterDto
import outcobra.server.model.interfaces.Mapper

/**
 * Maps [Semester]s to [SemesterDto]s and back
 *
 * @author Florian Bürgi
 * @since 1.0.0
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