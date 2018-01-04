package outcobra.server.model

import org.hibernate.validator.constraints.Length
import outcobra.server.model.interfaces.ParentLinked

import javax.jdo.annotations.Unique
import javax.persistence.Entity
import javax.persistence.OneToMany
import javax.validation.constraints.NotNull
import java.util.ArrayList

@Entity
class User : AbstractEntity, ParentLinked {
    @Length(max = 50)
    @NotNull
    private var username: String? = null

    @Length(max = 100)
    @NotNull
    @Unique
    private var mail: String? = null

    @OneToMany(mappedBy = "user")
    private var institutions: List<Institution>? = null

    @OneToMany(mappedBy = "user")
    private val identities: List<Identity>? = null


    override val parent: ParentLinked?
        get() = this

    //region Constructors
    constructor(id: Long?, username: String, mail: String, institutions: List<Institution>) {
        this.username = username
        this.institutions = institutions
        this.mail = mail
    }

    constructor(username: String, mail: String, institutions: List<Institution>) {
        this.username = username
        this.institutions = institutions
        this.mail = mail
    }

    constructor(id: Long?, username: String, mail: String) : this() {
        this.username = username
        this.mail = mail
    }

    constructor() {
        this.institutions = ArrayList()
    }
}