package outcobra.server.model.dto

import outcobra.server.model.domain.Subject
import outcobra.server.model.interfaces.OutcobraDto
import outcobra.server.model.interfaces.ParentLink
import java.time.LocalDate

/**
 * @author Vincent Perret
 */
data class TaskDto(
        val id: Long = 0,
        val name: String = "",
        val description: String = "",
        val todoDate: LocalDate = LocalDate.now(),
        val dueDate: LocalDate = LocalDate.now().plusDays(1),
        val effort: Double = 0.0,
        val progress: Int = 0,
        override val schoolClass: SchoolClassDto,
        override val subject: SubjectDto, override val semester: SemesterDto) : SchoolClassSemesterSubjectDto, OutcobraDto {

    override val identifier: Long get() = id

    override val parentLink: ParentLink
        get() = ParentLink.make(subject.id, Subject::class.java)

}