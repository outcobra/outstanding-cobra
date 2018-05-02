package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.validation.constraints.NotNull

@Entity
data class Teacher(@NotNull var name: String = "",
                   var email: String? = null,
                   @ManyToOne var institution: Institution? = null,
                   @OneToMany(mappedBy = "teacher") var subjects: List<Subject> = listOf())
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = institution
}