package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
class SchoolYear(
        @NotNull var name: String = "",
        @NotNull var validFrom: LocalDate = LocalDate.now(),
        @NotNull var validTo: LocalDate = LocalDate.now(),
        @ManyToOne @NotNull var user: User = User(),

        @ManyToMany(mappedBy = "schoolYears")
        var schoolClasses: MutableList<SchoolClass> = mutableListOf(),

        @OneToMany(mappedBy = "schoolYear", cascade = [(CascadeType.ALL)])
        var semesters: List<Semester> = listOf(),

        @OneToMany(mappedBy = "schoolYear")
        var holidays: List<Holiday> = listOf())
    : ParentLinked, AbstractEntity() {


    override val parent: ParentLinked?
        get() = user
}