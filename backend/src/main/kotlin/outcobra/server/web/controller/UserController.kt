package outcobra.server.web.controller

import org.springframework.web.bind.annotation.*
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

    @PostMapping("/emailAvailable")
    fun checkEmailNotTaken(@RequestBody mail: String): Boolean {
        return userService.checkEmailNotTaken(mail)
    }
}