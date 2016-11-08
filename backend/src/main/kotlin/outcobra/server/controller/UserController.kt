package outcobra.server.controller

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import outcobra.server.model.dto.UserDto
import outcobra.server.service.UserService
import javax.inject.Inject

@RestController
@RequestMapping("/api/user")
class UserController @Inject constructor(val userService: UserService) {

    @RequestMapping(method = arrayOf(RequestMethod.GET))
    fun getCurrentUser(): UserDto {
        return userService.getCurrentUserDto()
    }

    @RequestMapping(value = "/login", method = arrayOf(RequestMethod.GET))
    fun loginRegister() {
        userService.loginRegister()
    }
}