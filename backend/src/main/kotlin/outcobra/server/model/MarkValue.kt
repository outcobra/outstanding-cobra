package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.OneToOne
import javax.validation.constraints.NotNull

@Entity
data class MarkValue(@NotNull override var value: Double = 0.0,
                     @NotNull override var weight: Double = 1.0,
                     @NotNull override var markGroup: MarkGroup? = null,
                     @NotNull override var description: String = "",
                     @OneToOne(mappedBy = "mark") var exam: Exam? = null) : Mark() {

    override val parent: ParentLinked?
        get() {
            if (exam != null) {
                return exam
            }
            return markGroup
        }

    constructor(value: Double, weight: Double) : this() {
        this.value = value
        this.weight = weight
    }
}
