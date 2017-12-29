package outcobra.server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import outcobra.server.model.dto.UserDto
import outcobra.server.service.UserService
import javax.inject.Inject

@RestController
@RequestMapping("/api/user")
class UserController @Inject constructor(val userService: UserService) {

    @GetMapping
    fun getCurrentUser(): UserDto {
        return userService.getCurrentUserDto()
    }

    @GetMapping("/login")
    fun loginRegister(): UserDto {
        return userService.loginRegister()
    }
}