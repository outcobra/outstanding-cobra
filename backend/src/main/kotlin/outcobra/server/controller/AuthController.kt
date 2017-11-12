package outcobra.server.controller

import com.fasterxml.jackson.databind.node.TextNode
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.config.AuthRegistry
import outcobra.server.model.dto.UserDto
import outcobra.server.service.internal.GoogleAuthService
import javax.inject.Inject


@RestController
@RequestMapping("/api/auth")
class AuthController @Inject constructor(
        @Qualifier(AuthRegistry.GOOGLE) val googleAuth: GoogleAuthService
) {
    @PostMapping("/google")
    fun handleGoogleAuth(@RequestBody idToken: TextNode): UserDto {
        return googleAuth.loginOrSignUp(null, idToken.asText())
    }
}