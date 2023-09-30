package com.example.server.level

import com.example.server.level.exceptions.LevelNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class LevelProblemDetailsHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(LevelNotFoundException::class)
    fun handleLevelNotFound(e: LevelNotFoundException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND)
        problem.title = "Level not found"
        problem.detail = e.message
        return problem
    }

}