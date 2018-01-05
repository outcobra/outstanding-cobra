package outcobra.server.model

import com.querydsl.core.annotations.QueryInit
import outcobra.server.model.interfaces.ParentLinked
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
data class Semester(@NotNull var name: String = "",
                    @NotNull var validFrom: LocalDate = LocalDate.now(),
                    @NotNull var validTo: LocalDate = LocalDate.now(),
                    @ManyToOne @NotNull @QueryInit("schoolClass.institution.user") var schoolYear: SchoolYear? = null,
                    @OneToMany(mappedBy = "semester", cascade = arrayOf(CascadeType.REMOVE)) var subjects: List<Subject> = listOf(),
                    @OneToMany(mappedBy = "semester") var markReports: List<MarkReport> = listOf(),
                    @OneToOne var timetable: Timetable? = null)
    : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked?
        get() = schoolYear
}
