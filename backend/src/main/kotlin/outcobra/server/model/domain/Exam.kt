package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import javax.validation.constraints.NotNull


@Entity
data class Exam(@NotNull var name: String = "",
                @NotNull var date: LocalDate = LocalDate.now(),
                @OneToMany(mappedBy = "exam", cascade = [(CascadeType.REMOVE)])
                var tasks: List<ExamTask> = listOf(),

                @OneToOne
                var schoolClassSubjectSemester: SchoolClassSubjectSemester? = null,

                @OneToOne(cascade = [(CascadeType.ALL)])
                var mark: MarkValue? = null,

                @NotNull var description: String = "")
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = schoolClassSubjectSemester?.subject
}