package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.validation.constraints.NotNull

@Entity
class SchoolYear(
        @NotNull var name: String = "",
        @NotNull var validFrom: LocalDate = LocalDate.now(),
        @NotNull var validTo: LocalDate = LocalDate.now(),
        @ManyToOne var schoolClass: SchoolClass? = null,
        @OneToMany(mappedBy = "schoolYear") var holidays: List<Holiday> = listOf(),
        @OneToMany(mappedBy = "schoolYear", cascade = arrayOf(CascadeType.REMOVE))
        var semesters: List<Semester> = listOf()) : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked?
        get() = schoolClass
}
