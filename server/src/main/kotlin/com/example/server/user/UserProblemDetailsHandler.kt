package com.example.server.user

import com.example.server.user.exceptions.InvalidUserDTOException
import com.example.server.user.exceptions.UserAlreadyExistingException
import com.example.server.user.exceptions.UserNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class UserProblemDetailsHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(InvalidUserDTOException::class)
    fun handleInvalidUserDTO(e: InvalidUserDTOException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY)
        problem.title = "Invalid user body"
        problem.detail = e.toString()
        return problem
    }

    @ExceptionHandler(UserNotFoundException::class)
    fun handleUserNotFound(e: UserNotFoundException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND)
        problem.title = "User not found"
        problem.detail = e.message
        return problem
    }

    @ExceptionHandler(UserAlreadyExistingException::class)
    fun handleUserAlreadyExisting(e: UserAlreadyExistingException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.CONFLICT)
        problem.title = "User already existing"
        problem.detail = e.message
        return problem
    }

    @ExceptionHandler(IllegalStateException::class)
    fun handleIllegalState(e: IllegalStateException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.CONFLICT)
        problem.title = "User Type not existing"
        problem.detail = e.message
        return problem
    }

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleUserBadFormatting(e: java.lang.IllegalArgumentException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.CONFLICT)
        problem.title = "Request param not valid"
        problem.detail = e.message
        return problem
    }
}