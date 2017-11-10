package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import javax.validation.constraints.NotNull

@Entity
data class MarkGroup(@NotNull override var description: String = "",
                     @NotNull override var weight: Double = 1.0,
                     @ManyToOne override var markGroup: MarkGroup? = null,
                     @OneToMany(mappedBy = "markGroup") var marks: MutableList<Mark> = mutableListOf(),
                     @OneToOne(mappedBy = "markGroup") var subject: Subject? = null) : Mark() {

    override val parent: ParentLinked?
        get() {
            if (this.markGroup == null) {
                return subject
            }
            return markGroup
        }


    override val value: Double
        get() {
            if (marks.isEmpty()) {
                return 0.0
            }
            var valueSum = 0.0
            var weightSum = 0.0

            for (mark in marks) {
                if (mark.value == 0.0) continue
                valueSum += mark.weight * mark.value
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
