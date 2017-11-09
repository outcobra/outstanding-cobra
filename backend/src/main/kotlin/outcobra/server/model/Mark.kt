package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.Inheritance
import javax.persistence.InheritanceType

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
abstract class Mark : ParentLinked, AbstractEntity() {
    abstract var weight: Double

    abstract var description: String

    abstract var markGroup: MarkGroup?

    abstract val value: Double

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
