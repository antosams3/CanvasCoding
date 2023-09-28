package com.example.server.course

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull


data class CourseDTO(
    val id: Int?,
    @field:NotNull
    val grade: Int,
    @field:NotBlank(message = "A name must be defined")
    val name: String,
    @field:NotNull(message = "A year must be defined ")
    val year: Int,
    val teacher_id: Int?
)

fun Course.toDTO() : CourseDTO{
    return CourseDTO(getId(),grade,name,year,teacher.getId())
}

