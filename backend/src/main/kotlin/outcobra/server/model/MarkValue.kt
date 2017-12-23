package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.OneToOne
import javax.validation.constraints.NotNull

@Entity
class MarkValue(@NotNull private var value: Double = 0.0,
                weight: Double = 1.0,
                markGroup: MarkGroup? = null,
                description: String = "",
                @OneToOne(mappedBy = "mark") var exam: Exam? = null) : Mark(weight, description, markGroup) {

    override fun getValue(): Double {
        return value
    }

    override val parent: ParentLinked?
        get() = markGroup

}
