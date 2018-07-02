package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import javax.validation.constraints.NotNull

@Entity
data class Semester(@NotNull var name: String = "",
                    @NotNull var validFrom: LocalDate = LocalDate.now(),
                    @NotNull var validTo: LocalDate = LocalDate.now(),

                    @ManyToOne @NotNull
                    var schoolYear: SchoolYear? = null,

                    @OneToMany(mappedBy = "semester")
                    var schoolClassSemester: List<SchoolClassSemester> = listOf(),

                    @OneToOne var timetable: Timetable? = null)
    : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked?
        get() = schoolYear
}
