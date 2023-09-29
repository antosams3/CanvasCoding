package com.example.server.authentication.signup

import com.example.server.authentication.signup.exceptions.InvalidSignupRequestDTOException
import com.example.server.utils.ProfileType
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.security.access.annotation.Secured
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
class SignupController(
    private val signupService: SignupService
) {

    @PostMapping("/API/signup")
    @ResponseStatus(HttpStatus.CREATED)
    fun signup(@Valid @RequestBody signupRequestDTO: SignupRequestDTO, br: BindingResult): SignupResponseDTO? {
        if (br.hasErrors()) {
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidSignupRequestDTOException(errMessages)
        }
        return signupService.register(signupRequestDTO, ProfileType.STUDENT)
    }

    @PostMapping("/API/createTeacher")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured("ROLE_TEACHER")
    fun createTeacher(@Valid @RequestBody signupRequestDTO: SignupRequestDTO, br: BindingResult): SignupResponseDTO?{
        if (br.hasErrors()) {
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidSignupRequestDTOException(errMessages)
        }

        return signupService.register(signupRequestDTO, ProfileType.TEACHER)
    }
}