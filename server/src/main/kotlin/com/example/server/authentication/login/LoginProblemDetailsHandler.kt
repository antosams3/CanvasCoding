package com.example.server.authentication.login

import com.example.server.authentication.login.exceptions.InvalidLoginRequestDTOException
import com.example.server.authentication.login.exceptions.LoginNotAllowedException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class LoginProblemDetailsHandler: ResponseEntityExceptionHandler() {
    @ExceptionHandler(InvalidLoginRequestDTOException::class)
    fun handleInvalidLoginRequestDTO(e: InvalidLoginRequestDTOException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY)
        problem.title = "Invalid login request body"
        problem.detail = e.toString()
        return problem
    }

    @ExceptionHandler(LoginNotAllowedException::class)
    fun handleLoginNotAllowed(e: LoginNotAllowedException): ProblemDetail {
        val problem = ProblemDetail.forStatus(e.errorDetails.statusCode)
        problem.title = "Login not allowed"
        problem.detail = e.message
        return problem
    }
}