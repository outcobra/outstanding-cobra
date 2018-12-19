package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.validation.constraints.NotNull

@Entity
data class ExamTask(@NotNull var task: String = "",
                    @NotNull @ManyToOne val exam: Exam? = null,
                    @NotNull var finished: Boolean = false)
    : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked?
        get() = exam
}
