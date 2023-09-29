package com.example.server.profile

import com.example.server.course.Course
import com.example.server.utils.EntityBase
import com.example.server.utils.ProfileType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne

@Entity
class Profile(
    @Column(unique = true, updatable = false, nullable = false)
    var email: String = "",
    var name: String = "",
    var surname : String = "",
    @Column(updatable = false, nullable = false)
    var type : ProfileType = ProfileType.STUDENT,
    @ManyToOne
    var course: Course? = null
): EntityBase<Int>()

fun ProfileDTO.toEntity(type: ProfileType, course: Course?): Profile {
    return Profile(email, name, surname, type = type, course = course)
}