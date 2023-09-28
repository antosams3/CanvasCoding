package com.example.server.course

import com.example.server.user.User
import com.example.server.utils.EntityBase
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne

@Entity
class Course(
    var grade: Int = 1,
    var name: String = "",
    var year: Int,
    @ManyToOne
    var teacher: User
) : EntityBase<Int>()

fun CourseDTO.toEntity(teacher: User) : Course {
    return Course(grade,name,year, teacher = teacher)
}