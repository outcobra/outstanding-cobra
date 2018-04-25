package outcobra.server.model.domain

import outcobra.server.model.interfaces.ParentLinked
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.validation.constraints.NotNull

/**
 * This class represents an Institution.
 * It is used by hibernate to store the information to the database
 * A documentation of the instance fields does not make sense because it is self-explanatory.
 *
 * @author Joel Messerli
 * @since 1.0.0
 */
@Entity
data class Institution(@NotNull var name: String = "",
                       @ManyToOne var user: User? = null,
                       @OneToMany(mappedBy = "institution", cascade = arrayOf(CascadeType.REMOVE))
                       var schoolClasses: List<SchoolClass>? = null,
                       @OneToMany(mappedBy = "institution") var teachers: List<Teacher>? = null)
    : ParentLinked, AbstractEntity() {

    override val parent: ParentLinked?
        get() = user
}