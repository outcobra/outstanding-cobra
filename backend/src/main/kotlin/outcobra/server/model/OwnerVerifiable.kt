package outcobra.server.model

interface OwnerVerifiable {
    fun verifyOwner(owner: String): Boolean
}