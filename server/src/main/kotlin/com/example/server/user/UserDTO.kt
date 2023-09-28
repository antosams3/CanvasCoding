package com.example.server.user

import com.example.server.utils.UserType

data class UserDTO(
    val id: Int?,
    val email: String,
    val name: String,
    val surname: String,
    val password: String,
    val type: UserType,
    val course_id : Int?
    )

fun User.toDTO(): UserDTO{
    return UserDTO(getId(),email, name, surname, password, type, course?.getId())
}