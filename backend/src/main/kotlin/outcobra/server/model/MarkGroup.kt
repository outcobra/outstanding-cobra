package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.OneToMany
import javax.persistence.OneToOne

@Entity
class MarkGroup(description: String = "",
                weight: Double = 1.0,
                markGroup: MarkGroup? = null,
                @OneToMany(mappedBy = "markGroup") var marks: MutableList<Mark> = mutableListOf(),
                @OneToOne(mappedBy = "markGroup") var subject: Subject? = null) : Mark(weight, description, markGroup) {

    override val parent: ParentLinked?
        get() {
            if (this.markGroup == null) {
                return subject
            }
            return markGroup
        }


    override fun getValue(): Double {
        if (marks.isEmpty()) {
            return 0.0
        }
        var valueSum = 0.0
        var weightSum = 0.0

        for (mark in marks) {
            if (mark.getValue() == 0.0) continue
            valueSum += mark.weight * mark.getValue()
            weightSum += mark.weight
        }

        return if (weightSum == 0.0) {
            0.0
        } else valueSum / weightSum
    }

    // Todo persist
    fun addMark(mark: Mark) {
        marks.add(mark)
    }

    // Todo persist
    fun removeMark(mark: Mark) {
        marks.remove(mark)
    }
}
