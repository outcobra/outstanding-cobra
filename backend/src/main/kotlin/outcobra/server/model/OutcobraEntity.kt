package outcobra.server.model

/**
 * Created by bbuerf on 08.11.2016.
 */
interface OutcobraEntity<Entity, Dto> : MappableEntity<Dto, Entity>,  OwnerVerifiable {

}