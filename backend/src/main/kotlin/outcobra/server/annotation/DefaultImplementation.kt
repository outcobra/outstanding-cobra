package outcobra.server.annotation

import javax.inject.Qualifier

/**
 * @see Qualifier
 * This is a custom @[Qualifier] annotation
 * It is used to inject the default implementation into a mock service
 * Makes the code more readable
 *
 * @author Florian Buergi
 * @since 1.0.0
 */

@Qualifier
annotation class DefaultImplementation