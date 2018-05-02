package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.ManyToMany
import javax.persistence.ManyToOne
import javax.validation.constraints.NotNull

@Entity(name = "class")
class SchoolClass(@NotNull var normalizedName: String = "",
                  @ManyToOne var institution: Institution? = null,
                  @ManyToMany(mappedBy = "schoolClasses")
                  var schoolYears: MutableList<SchoolYear> = mutableListOf())
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = institution
}

