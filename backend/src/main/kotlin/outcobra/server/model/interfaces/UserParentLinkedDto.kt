package outcobra.server.model.interfaces

import outcobra.server.model.domain.User

interface UserParentLinkedDto : ParentLinkedDto {
    var userId: Long

    override val parentLink: ParentLink
        get() = ParentLink.make(userId, User::class.java)
}