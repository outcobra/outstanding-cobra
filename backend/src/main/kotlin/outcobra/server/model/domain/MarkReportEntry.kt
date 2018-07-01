package outcobra.server.model.domain


import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToOne
import javax.validation.constraints.NotNull

@Entity
data class MarkReportEntry(@NotNull var weight: Double? = null,
                           @OneToOne
                           var schoolClassSubjectSemester: SchoolClassSubjectSemester,
                           @NotNull @ManyToOne var report: MarkReport? = null)
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = schoolClassSubjectSemester.subject
}
