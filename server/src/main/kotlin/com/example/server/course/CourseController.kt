package com.example.server.course

import com.example.server.course.exceptions.InvalidCourseDTOException
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
class CourseController(
    private val courseService: CourseService
) {

    @PostMapping("/API/courses/{profile_email}")
    fun postCourse(@Valid @RequestBody courseDTO: CourseDTO, br : BindingResult, @PathVariable profile_email : String) : CourseDTO?{
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidCourseDTOException(errMessages)
        }
        return courseService.postCourse(profile_email,courseDTO)
    }

    @PutMapping("/API/courses/{profile_email}")
    fun putCourse(@Valid @RequestBody courseDTO: CourseDTO, br : BindingResult, @PathVariable profile_email : String): CourseDTO? {
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidCourseDTOException(errMessages)
        }
        return courseService.putCourse(profile_email, courseDTO)
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