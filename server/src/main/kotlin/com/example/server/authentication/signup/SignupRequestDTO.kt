package com.example.server.authentication.signup

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class SignupRequestDTO (
    @field:NotBlank(message = "An email must be defined")
    @field:Email(message = "Insert a valid email")
    val email: String,
    @field:NotBlank(message = "A password must be defined")
    @field:Size(min = 8, message = "The password must contain at least 8 characters")
    val password: String,
    @field:NotBlank(message = "A name must be defined")
    val name: String,
    @field:NotBlank(message = "A surname must be defined")
    val surname: String,
    val course_id: Int?
    )