package com.example.server.course

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CourseRepository: JpaRepository<Course, Int> {
    fun findByGradeAndNameAndYear(grade: Int, name: String, year: Int): Course?

}