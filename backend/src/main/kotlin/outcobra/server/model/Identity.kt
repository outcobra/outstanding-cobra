package outcobra.server.model

import outcobra.server.model.interfaces.ParentLinked

import javax.jdo.annotations.Index
import javax.persistence.Entity

import javax.persistence.ManyToOne
import javax.validation.constraints.NotNull

/**
 * @author Florian Bürgi
 * @since <since>
</since> */
@Entity
class Identity : AbstractEntity, ParentLinked {
    @NotNull
    @ManyToOne
    var user: User? = null

    @NotNull
    var identityType: String? = null

    @Index(name = "idx_identity_identifier")
    @NotNull
    var identifier: String? = null
    var secret: String? = null

    override val parent: ParentLinked?
        get() = user

    constructor() {}

    constructor(user: User, identityType: String, identifier: String, secret: String) {
        this.user = user
        this.identityType = identityType
        this.identifier = identifier
        this.secret = secret
    }


}
