package outcobra.server.data.loaders

interface DataLoader {
    fun shouldLoad(): Boolean
    fun load(): Unit
}