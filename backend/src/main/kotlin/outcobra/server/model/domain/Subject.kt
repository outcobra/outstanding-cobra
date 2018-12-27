package outcobra.server.model.domain

import com.querydsl.core.annotations.QueryInit
import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
data class Subject(@NotNull var name: String = "",
                   @NotNull @Enumerated(EnumType.STRING) var color: Color = Color.BLUE,
                   @ManyToOne @NotNull var user: User = User(),
                   @OneToMany(mappedBy = "subject") @QueryInit("subject.user", "schoolClassSemester.semester")
                   var schoolClassSemesterSubjects: List<SchoolClassSemesterSubject> = listOf(),
                   @ManyToOne @QueryInit("user") var teacher: Teacher? = null)
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = user
}
