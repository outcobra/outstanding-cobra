package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.*

@Entity
@SecondaryTable(name = "school_class_subject_semester_mark", pkJoinColumns = [PrimaryKeyJoinColumn(name = "mark_group_id", referencedColumnName = "id")])
class MarkGroup(description: String = "",
                weight: Double = 1.0,
                markGroup: MarkGroup? = null,
                @OneToMany(mappedBy = "markGroup")
                var marks: MutableList<Mark> = mutableListOf(),

                @OneToOne
                var schoolClassSubjectSemester: SchoolClassSubjectSemester
) : Mark(weight, description, markGroup) {

    override val parent: ParentLinked?
        get() = markGroup ?: schoolClassSubjectSemester.subject


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
