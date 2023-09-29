package com.example.server.authentication.signup

import com.example.server.utils.ProfileType

interface SignupService {
    fun register(signupRequestDTO: SignupRequestDTO, profileType: ProfileType) : SignupResponseDTO?

}