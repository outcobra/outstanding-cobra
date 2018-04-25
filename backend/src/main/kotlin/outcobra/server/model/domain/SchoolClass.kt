package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity(name = "class")
class SchoolClass(@NotNull var normalizedName: String = "",
                  @ManyToOne var institution: Institution? = null,
                  @ManyToMany(mappedBy = "schoolClasses", cascade = [(CascadeType.REMOVE)])
                  var schoolYears: List<SchoolYear> = listOf())
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = institution
}

