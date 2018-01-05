package outcobra.server.model.interfaces

interface ParentLink {
    val id: Long?

    val parentClass: Class<out ParentLinked>

    companion object {

        fun make(parentId: Long?, parentClass: Class<out ParentLinked>): ParentLink {
            return object : ParentLink {
                override val id: Long?
                    get() = parentId

                override val parentClass: Class<out ParentLinked>
                    get() = parentClass
            }
        }
    }
}
