package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import javax.validation.constraints.NotNull

@Entity
data class Timetable(@NotNull @OneToOne(mappedBy = "timetable") var semester: Semester? = null,
                     @OneToMany(mappedBy = "timetable") var entries: List<TimetableEntry> = listOf())
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = semester
}