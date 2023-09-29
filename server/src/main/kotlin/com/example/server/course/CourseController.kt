package com.example.server.course

import com.example.server.course.exceptions.InvalidCourseDTOException
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@CrossOrigin
class CourseController(
    private val courseService: CourseService
) {

    @PostMapping("/API/courses")
    fun postCourse(@Valid @RequestBody courseDTO: CourseDTO, br : BindingResult, principal : Principal) : CourseDTO?{
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidCourseDTOException(errMessages)
        }
        return courseService.postCourse(principal.name,courseDTO)
    }

    @PutMapping("/API/courses")
    fun putCourse(@Valid @RequestBody courseDTO: CourseDTO, br : BindingResult, principal : Principal): CourseDTO? {
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidCourseDTOException(errMessages)
        }
        return courseService.putCourse(principal.name, courseDTO)
    }

    @GetMapping("/API/courses/{id}")
    fun getCourse(@PathVariable id: Int): CourseDTO? {
        return courseService.getCourse(id)
    }

    @DeleteMapping("/API/courses/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteCourse(@PathVariable id: Int){
        courseService.deleteCourse(id)
    }

}