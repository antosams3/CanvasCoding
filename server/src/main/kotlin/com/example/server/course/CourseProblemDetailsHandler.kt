package com.example.server.course

import com.example.server.course.exceptions.CourseNotFoundException
import com.example.server.course.exceptions.InvalidCourseDTOException
import com.example.server.course.exceptions.OperationNotAllowedException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class CourseProblemDetailsHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(InvalidCourseDTOException::class)
    fun handleInvalidUserDTO(e: InvalidCourseDTOException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY)
        problem.title = "Invalid course body"
        problem.detail = e.toString()
        return problem
    }

    @ExceptionHandler(CourseNotFoundException::class)
    fun handleUserNotFound(e: CourseNotFoundException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND)
        problem.title = "Course not found"
        problem.detail = e.message
        return problem
    }

    @ExceptionHandler(OperationNotAllowedException::class)
    fun handleOperationNotAllowed(e: OperationNotAllowedException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.FORBIDDEN)
        problem.title = "Operation not allowed"
        problem.detail = e.message
        return problem
    }

}