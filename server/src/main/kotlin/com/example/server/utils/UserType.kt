package com.example.server.utils

enum class UserType {
    STUDENT,
    TEACHER;

    override fun toString() : String {
        return when(this) {
            STUDENT -> "STUDENT"
            TEACHER -> "TEACHER"
        }
    }
}

fun toUserType(string: String) : UserType {
    return when(string){
        "STUDENT" -> UserType.STUDENT
        "TEACHER" -> UserType.TEACHER
        else -> throw IllegalStateException("This string cannot be casted to a UserType")
    }
}