package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
data class Subject(@NotNull var name: String = "",
                   @NotNull @Enumerated(EnumType.STRING) var color: Color = Color.BLUE,

                   @ManyToOne @NotNull
                   var user: User = User(),

                   @ManyToMany
                   @JoinTable(name = "subject_semester", joinColumns = [JoinColumn(name = "subject_id")], inverseJoinColumns = [JoinColumn(name = "semester_id")])
                   var semesters: List<Semester> = listOf(),

                   @ManyToMany
                   @JoinTable(name = "subject_school_class", joinColumns = [JoinColumn(name = "subject_id")], inverseJoinColumns = [JoinColumn(name = "school_class_id")])
                   var schoolClasses: List<SchoolClass> = listOf(),

                   @OneToMany(mappedBy = "subject")
                   var timetableEntries: List<TimetableEntry> = listOf(),

                   @OneToMany(mappedBy = "subject")
                   var tasks: List<Task> = listOf(),

                   @OneToMany(mappedBy = "subject")
                   var markReportEntries: List<MarkReportEntry> = listOf(),

                   @OneToMany(mappedBy = "subject")
                   var exams: List<Exam> = listOf(),

                   @OneToOne
                   var markGroup: MarkGroup? = null,

                   @ManyToOne
                   var teacher: Teacher? = null)
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = user
}
