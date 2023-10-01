package com.example.server.course

import com.example.server.profile.Profile
import com.example.server.utils.EntityBase
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany

@Entity
class Course(
    var grade: Int = 1,
    var name: String = "",
    var year: Int,
    @ManyToOne
    var teacher: Profile,
    @OneToMany(mappedBy = "course")
    val students: MutableSet<Profile> = mutableSetOf()
) : EntityBase<Int>()

fun CourseDTO.toEntity(teacher: Profile) : Course {
    return Course(grade,name,year, teacher = teacher)
}