package outcobra.server.model


import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.validation.constraints.NotNull

@Entity
data class MarkReportEntry(@NotNull var weight: Double? = null,
                           @NotNull @ManyToOne var subject: Subject? = null,
                           @NotNull @ManyToOne var report: MarkReport? = null) : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked?
        get() = subject
    //endregion


}
