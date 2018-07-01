package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import javax.validation.constraints.NotNull


@Entity
data class MarkReport(@NotNull var name: String = "",
                      @OneToOne
                      var schoolClassSubjectSemester: SchoolClassSubjectSemester,
                      @OneToMany(mappedBy = "report") var entries: List<MarkReportEntry> = arrayListOf())
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = schoolClassSubjectSemester.semester
}
