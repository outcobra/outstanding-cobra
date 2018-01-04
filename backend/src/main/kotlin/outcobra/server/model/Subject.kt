package outcobra.server.model

import com.querydsl.core.annotations.QueryInit
import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
data class Subject(@NotNull var name: String = "",
                   @NotNull @Enumerated(EnumType.STRING) var color: Color? = null,
                   @ManyToOne @QueryInit("schoolYear.schoolClass.institution.user") var semester: Semester? = null,
                   @OneToMany(mappedBy = "subject") var timetableEntries: List<TimetableEntry> = listOf(),
                   @OneToMany(mappedBy = "subject") var tasks: List<Task> = listOf(),
                   @OneToMany(mappedBy = "subject") var markReportEntries: List<MarkReportEntry> = listOf(),
                   @OneToMany(mappedBy = "subject") var exams: List<Exam> = listOf(),
                   @OneToOne var markGroup: MarkGroup? = null,
                   @ManyToOne var teacher: Teacher? = null)
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = semester
}
