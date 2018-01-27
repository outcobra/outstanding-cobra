package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.validation.constraints.NotNull


@Entity
data class MarkReport(@NotNull var name: String = "",
                      @NotNull @ManyToOne var semester: Semester? = null,
                      @OneToMany(mappedBy = "report") var entries: List<MarkReportEntry> = arrayListOf())
    : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked?
        get() = semester
}
