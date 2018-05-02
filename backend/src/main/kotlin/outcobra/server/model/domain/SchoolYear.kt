package outcobra.server.model.domain

import com.querydsl.core.annotations.QueryInit
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
        @QueryInit("institution.user")
        @ManyToMany(cascade = [(CascadeType.ALL)])
        var schoolClasses: MutableList<SchoolClass> = mutableListOf(),
        @OneToMany(mappedBy = "schoolYear") var holidays: List<Holiday> = listOf(),
        @OneToMany(mappedBy = "schoolYear", cascade = [(CascadeType.REMOVE)])
        var semesters: List<Semester> = listOf()) : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = user
}