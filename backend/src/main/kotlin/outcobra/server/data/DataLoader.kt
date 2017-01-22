package outcobra.server.data

interface DataLoader {
    fun shouldLoad(): Boolean
    fun load(): Unit
}