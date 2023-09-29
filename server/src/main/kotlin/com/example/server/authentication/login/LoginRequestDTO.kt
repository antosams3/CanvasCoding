package com.example.server.authentication.login

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class LoginRequestDTO(
    @field:NotBlank(message = "An email must be defined")
    @field:Email(message = "Insert a valid email")
    val email: String,
    @field:NotBlank(message = "A password must be defined")
    val password: String,
)