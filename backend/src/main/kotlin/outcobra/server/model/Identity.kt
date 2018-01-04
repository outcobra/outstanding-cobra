package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked

import javax.jdo.annotations.Index
import javax.persistence.Entity

import javax.persistence.ManyToOne
import javax.validation.constraints.NotNull

/**
 * @author Florian Bürgi
 * @since <since>
 */
@Entity
data class Identity(@NotNull @ManyToOne var user: User? = null,
                    @NotNull var identityType: String = "",
                    @Index(name = "idx_identity_identifier") @NotNull var identifier: String = "",
                    var secret: String? = null)
    : AbstractEntity(), ParentLinked {

    override val parent: ParentLinked?
        get() = user
}