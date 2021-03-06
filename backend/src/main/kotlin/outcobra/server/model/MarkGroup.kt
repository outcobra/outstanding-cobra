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
        get() = markGroup ?: subject


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

    fun addMark(mark: Mark) {
        marks.add(mark)
    }

    fun removeMark(mark: Mark) {
        marks.remove(mark)
    }
}
