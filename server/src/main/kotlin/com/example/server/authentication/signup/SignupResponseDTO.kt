package com.example.server.authentication.signup

import com.example.server.utils.ProfileType

data class SignupResponseDTO(
    val email: String,
    val name: String,
    val surname: String,
    val type: ProfileType = ProfileType.STUDENT
)