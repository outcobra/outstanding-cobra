package outcobra.server.model

import com.querydsl.core.annotations.QueryInit
import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.NotNull


@Entity
data class Exam(@NotNull var name: String = "",
                @NotNull var date: LocalDate = LocalDate.now(),
                @OneToMany(mappedBy = "exam", cascade = [(CascadeType.REMOVE)]) var tasks: List<ExamTask> = listOf(),
                @QueryInit("semester.schoolYear.schoolClass.institution.user")
                @NotNull @ManyToOne var subject: Subject? = null,
                @OneToOne(cascade = [(CascadeType.ALL)]) var mark: MarkValue? = null,
                @NotNull var description: String = "")
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = subject
}