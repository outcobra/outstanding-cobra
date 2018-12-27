package outcobra.server.model.domain

import com.querydsl.core.annotations.QueryInit
import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
data class Semester(@NotNull var name: String = "",
                    @NotNull var validFrom: LocalDate = LocalDate.now(),
                    @NotNull var validTo: LocalDate = LocalDate.now(),
                    @ManyToOne @NotNull @QueryInit("user") var schoolYear: SchoolYear? = null,
                    @OneToMany(mappedBy = "semester", cascade = [CascadeType.ALL])
                    var schoolClassSemester: MutableList<SchoolClassSemester> = mutableListOf(),
                    @OneToOne var timetable: Timetable? = null)
    : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked?
        get() = schoolYear
}
