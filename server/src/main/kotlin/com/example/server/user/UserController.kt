package com.example.server.user

import com.example.server.user.exceptions.InvalidUserDTOException
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
class UserController (
    private val userService: UserService
    ) {

    @PostMapping("/API/users/{courseId}")
    fun postUser(@Valid @RequestBody userDTO: UserDTO,@PathVariable courseId: Int, br : BindingResult): UserDTO?{
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidUserDTOException(errMessages)
        }
        return userService.postUser(courseId,userDTO)
    }

    @DeleteMapping("/API/users/{email}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteUser(@PathVariable email: String){
        userService.deleteUser(email)
    }

    @GetMapping("/API/users/{email}")
    fun getUser(@PathVariable email: String) : UserDTO?{
        return userService.getUser(email)
    }

    @GetMapping("/API/users")
    fun getUsersByType (@RequestParam type: String) : List<UserDTO?> {
        return userService.getUsersByType(type)
    }
}