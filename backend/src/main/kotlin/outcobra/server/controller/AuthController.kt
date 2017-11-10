package outcobra.server.controller

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
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
    @GetMapping("/google/{idToken}")
    fun handleGoogleAuth(@PathVariable("idToken") idToken: String): UserDto {
        return googleAuth.loginOrSignUp(null, idToken)
    }
}