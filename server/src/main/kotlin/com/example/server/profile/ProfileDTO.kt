package com.example.server.profile

import com.example.server.utils.ProfileType

data class ProfileDTO(
    val id: Int?,
    val email: String,
    val name: String,
    val surname: String,
    val password: String,
    val type: ProfileType,
    val course_id : Int?
    )

fun Profile.toDTO(): ProfileDTO{
    return ProfileDTO(getId(),email, name, surname, password, type, course?.getId())
}