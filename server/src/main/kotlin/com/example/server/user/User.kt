package com.example.server.user

import com.example.server.course.Course
import com.example.server.utils.EntityBase
import com.example.server.utils.UserType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne

@Entity
class User(
    @Column(unique = true, updatable = false, nullable = false)
    var email: String = "",
    var name: String = "",
    var surname : String = "",
    var password: String = "",
    @Column(updatable = false, nullable = false)
    var type : UserType = UserType.STUDENT,
    @ManyToOne
    var course: Course? = null
): EntityBase<Int>()

fun UserDTO.toEntity(course: Course?): User {
    return User(email, name, surname, password, type, course = course)
}