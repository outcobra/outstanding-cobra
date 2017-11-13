package outcobra.server.web.controller

import com.fasterxml.jackson.databind.node.TextNode
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.web.auth.config.AuthRegistry
import outcobra.server.web.auth.internal.GoogleAuthService
import outcobra.server.web.auth.internal.UsernamePasswordAuthService
import outcobra.server.web.auth.model.UsernamePasswordDto
import javax.inject.Inject


@RestController
@RequestMapping("/api/auth")
class AuthController @Inject constructor(
        @Qualifier(AuthRegistry.GOOGLE) val googleAuth: GoogleAuthService,
        @Qualifier(AuthRegistry.PASSWORD) val usernamePasswordAuthService: UsernamePasswordAuthService) {

    @PostMapping("/google")
    fun handleGoogleAuth(@RequestBody idToken: TextNode): String {
        return googleAuth.loginOrSignUp(idToken.asText())
    }

    @PostMapping("/password")
    fun handleUsernamePasswordAuth(@RequestBody usernamePasswordDto: UsernamePasswordDto): String {
        return usernamePasswordAuthService.loginOrSignUp(usernamePasswordDto)
    }
}