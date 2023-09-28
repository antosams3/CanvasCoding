package com.example.server.course

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size


data class CourseDTO(
    val id: Int?,
    @field:Size(min=1, max=5, message = "Grade must be in the range 1..5")
    val grade: Int,
    @field:NotBlank(message = "A name must be defined")
    val name: String,
    @field:NotBlank(message = "A year must be defined ")
    val year: Int,
    val teacher_id: Int?
)

fun Course.toDTO() : CourseDTO{
    return CourseDTO(getId(),grade,name,year,teacher.getId())
}

