package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
data class Semester(@NotNull var name: String = "",
                    @NotNull var validFrom: LocalDate = LocalDate.now(),
                    @NotNull var validTo: LocalDate = LocalDate.now(),
                    @ManyToOne @NotNull var schoolYear: SchoolYear? = null,

                    @ManyToMany(cascade = [CascadeType.ALL])
                    var subjects: List<Subject> = listOf(),

                    @OneToMany(mappedBy = "semester")
                    var markReports: List<MarkReport> = listOf(),

                    @OneToOne var timetable: Timetable? = null)
    : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked?
        get() = schoolYear
}
