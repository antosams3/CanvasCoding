package com.example.server.profile

import com.example.server.utils.ProfileType

data class ProfileDTO(
    val email: String,
    val name: String,
    val surname: String,
    val type: ProfileType,
    val course_id : Int?
    )

fun Profile.toDTO(): ProfileDTO{
    return ProfileDTO(email, name, surname, type, course?.getId())
}