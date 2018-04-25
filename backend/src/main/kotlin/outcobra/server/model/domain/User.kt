package outcobra.server.model.domain

import org.hibernate.validator.constraints.Length
import outcobra.server.model.interfaces.ParentLinked
import javax.jdo.annotations.Unique
import javax.persistence.Entity
import javax.persistence.OneToMany
import javax.validation.constraints.NotNull

@Entity
data class User(@Length(max = 50) @NotNull var username: String = "",
                @Length(max = 100) @NotNull @Unique var mail: String = "",
                @OneToMany(mappedBy = "user") var institutions: List<Institution> = listOf(),
                @OneToMany(mappedBy = "user") val identities: List<Identity> = listOf())
    : AbstractEntity(), ParentLinked {

    override val parent: ParentLinked?
        get() = this

}