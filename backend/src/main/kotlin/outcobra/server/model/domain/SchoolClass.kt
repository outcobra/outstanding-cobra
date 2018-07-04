package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.validation.constraints.NotNull

@Entity(name = "class")
class SchoolClass(@NotNull var normalizedName: String = "",
                  @ManyToOne
                  var user: User = User(),

                  @OneToMany(mappedBy = "schoolClass")
                  var schoolClassSemester: List<SchoolClassSemester> = listOf()
) : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = user
}

