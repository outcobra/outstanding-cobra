package outcobra.server.annotation

import javax.inject.Qualifier

/**
 * @see Qualifier
 * This is a custom @[Qualifier] annotation
 * It is used to inject the default implementation into a mock service
 * Like that the code is more readable
 *
 * @author Florian Buergi
 * @since 1.0.0
 */

@Qualifier
annotation class DefaultImplementation