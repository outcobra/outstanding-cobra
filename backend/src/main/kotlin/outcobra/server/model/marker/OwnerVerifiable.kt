package outcobra.server.model.marker

interface OwnerVerifiable {
    fun verifyOwner(owner: String): Boolean
}