package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
data class Subject(@NotNull var name: String = "",
                   @NotNull @Enumerated(EnumType.STRING) var color: Color = Color.BLUE,

                   @ManyToOne @NotNull
                   var user: User = User(),

                   @OneToMany
                   var schoolClassSubjectSemester: List<SchoolClassSubjectSemester> = listOf(),

                   @ManyToOne
                   var teacher: Teacher? = null)
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = user
}
