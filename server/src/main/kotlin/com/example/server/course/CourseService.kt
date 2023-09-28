package com.example.server.course

interface CourseService {
    fun postCourse(email: String, courseDTO: CourseDTO): CourseDTO?
    fun putCourse(email: String, courseDTO: CourseDTO): CourseDTO?
    fun getCourse(id: Int) : CourseDTO?
    fun deleteCourse(id: Int)
}