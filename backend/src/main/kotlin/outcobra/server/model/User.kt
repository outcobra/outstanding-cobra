package outcobra.server.model

import org.hibernate.validator.constraints.Length
import outcobra.server.model.interfaces.ParentLinked
import javax.jdo.annotations.Index
import javax.jdo.annotations.Unique
import javax.persistence.Entity
import javax.persistence.OneToMany
import javax.validation.constraints.NotNull

@Entity
data class User(@Index @Unique @NotNull var auth0Id: String = "",
                @Length(max = 50) @NotNull var username: String = "",
                @OneToMany(mappedBy = "user") var institutions: List<Institution> = listOf())
    : ParentLinked, AbstractEntity() {
    override val parent: ParentLinked
        get() = this

    override fun toString(): String {
        return String.format("User{auth0Id='%s', username='%s', institutions=%s}", auth0Id, username, institutions)
    }

    //endregion
}
