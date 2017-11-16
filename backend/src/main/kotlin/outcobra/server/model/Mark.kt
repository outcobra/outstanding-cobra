package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.Inheritance
import javax.persistence.InheritanceType
import javax.persistence.ManyToOne
import javax.validation.constraints.NotNull

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
abstract class Mark : ParentLinked, AbstractEntity {

    @NotNull
    internal var weight: Double = 1.0

    @NotNull
    internal var description: String = ""

    @ManyToOne
    internal var markGroup: MarkGroup? = null

    abstract fun getValue(): Double

    constructor(weight: Double, description: String, markGroup: MarkGroup?) : super() {
        this.weight = weight
        this.description = description
        this.markGroup = markGroup
    }

    constructor() : super()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Mark) return false

        val mark = other

        if (id != mark.id) return false
        if (description != mark.description) return false
        return if (markGroup != null) markGroup == mark.markGroup else mark.markGroup == null
    }

    override fun hashCode(): Int {
        var result = java.lang.Double.valueOf(weight).hashCode()
        result = 31 * result + id.hashCode()
        result = 31 * result + description.hashCode()
        result = 31 * result + if (markGroup != null) markGroup!!.hashCode() else 0
        return result
    }

    //endregion
}
