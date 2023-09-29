package com.example.server.authentication.signup

import com.example.server.authentication.signup.exceptions.InvalidSignupRequestDTOException
import com.example.server.authentication.signup.exceptions.SignupNotAllowedException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class SignupProblemDetailsHandler: ResponseEntityExceptionHandler() {
    @ExceptionHandler(InvalidSignupRequestDTOException::class)
    fun handleInvalidSignupRequestDTO(e: InvalidSignupRequestDTOException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY)
        problem.title = "Invalid signup request body"
        problem.detail = e.toString()
        return problem
    }

    @ExceptionHandler(SignupNotAllowedException::class)
    fun handleSignupNotAllowed(e: SignupNotAllowedException): ProblemDetail {
        val problem = ProblemDetail.forStatus(e.statusInfo.statusCode)
        problem.title = "Signup not allowed"
        problem.detail = e.statusInfo.reasonPhrase
        return problem
    }
}