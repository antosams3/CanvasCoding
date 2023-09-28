package com.example.server.utils

enum class ProfileType {
    STUDENT,
    TEACHER;

    override fun toString() : String {
        return when(this) {
            STUDENT -> "STUDENT"
            TEACHER -> "TEACHER"
        }
    }
}

fun toProfileType(string: String) : ProfileType {
    return when(string){
        "STUDENT" -> ProfileType.STUDENT
        "TEACHER" -> ProfileType.TEACHER
        else -> throw IllegalStateException("This string cannot be casted to a ProfileType")
    }
}