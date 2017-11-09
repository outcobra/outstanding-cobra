package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.validation.constraints.NotNull

@Entity(name = "class")
class SchoolClass(@NotNull var normalizedName: String = "",
                  @ManyToOne var institution: Institution? = null,
                  @OneToMany(mappedBy = "schoolClass", cascade = arrayOf(CascadeType.REMOVE))
                  var schoolYears: List<SchoolYear> = listOf())
    : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked?
        get() = institution


}

