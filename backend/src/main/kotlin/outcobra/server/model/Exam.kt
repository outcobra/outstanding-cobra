package outcobra.server.model

import com.querydsl.core.annotations.QueryInit
import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.NotNull


@Entity
data class Exam(@NotNull var name: String = "",
                @NotNull var date: LocalDate = LocalDate.now(),
                @OneToMany(mappedBy = "exam", cascade = arrayOf(CascadeType.MERGE)) var tasks: List<ExamTask> = listOf(),
                @NotNull @ManyToOne @QueryInit("semester.schoolYear.schoolClass.institution.user") var subject: Subject? = null,
                @OneToOne(cascade = arrayOf(CascadeType.REMOVE)) var mark: MarkValue? = null, var description: String? = null)
    : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked?
        get() = subject


}
