package outcobra.server.web.config

import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import outcobra.server.config.ProfileRegistry
import javax.annotation.PostConstruct

@Profile(ProfileRegistry.BIT)
@Component
class BitConfig {
    @PostConstruct
    fun bitSetup() {
        System.setProperty("http.proxyHost", "proxy-bvcol.admin.ch")
        System.setProperty("http.proxyPort", "8080")
        System.setProperty("https.proxyHost", "proxy-bvcol.admin.ch")
        System.setProperty("https.proxyPort", "8080")
    }
}