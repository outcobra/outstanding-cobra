package outcobra.server.model.interfaces

interface ParentLinked {
    val parent: ParentLinked?

    val id: Long?
}